const BASE_URL = "/api/football-data/v4";

export type ApiTeam = {
  id: number;
  name: string;
  shortName?: string;
  tla?: string;
  crest?: string;
  venue?: string | null;
  website?: string | null;
  address?: string | null;
};

export type ApiStanding = {
  position: number;
  team: ApiTeam;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  goalDifference: number;
  points: number;
  form?: string | null;
};

export type ApiPlayer = {
  id: number;
  name: string;
  firstName?: string | null;
  lastName?: string | null;
  position?: string | null;
  dateOfBirth?: string | null;
  nationality?: string | null;
  shirtNumber?: number | null;
};

export type ApiTeamDetail = ApiTeam & {
  venue?: string | null;
  founded?: number | null;
  coach?: { name?: string | null } | null;
  squad?: ApiPlayer[];
};

export type ApiMatchStatus = "SCHEDULED" | "TIMED" | "IN_PLAY" | "PAUSED" | "LIVE" | "FINISHED" | "AWARDED" | "POSTPONED" | "SUSPENDED" | "CANCELLED";

export type ApiMatchTeam = Partial<ApiTeam> & { id: number | null; name: string | null };

export type ApiMatch = {
  id: number;
  utcDate: string;
  status: ApiMatchStatus;
  matchday?: number | null;
  stage?: string | null;
  venue?: string | null;
  minute?: number | string | null;
  season?: { startDate?: string; endDate?: string; currentMatchday?: number | null } | null;
  homeTeam: ApiTeam;
  awayTeam: ApiTeam;
  score: { winner?: "HOME_TEAM" | "AWAY_TEAM" | "DRAW" | null; fullTime: { home: number | null; away: number | null } };
};

async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { signal });

  if (res.status === 429) throw new Error("trop de requêtes, réessaie dans une minute");
  if (res.status === 403) throw new Error("cette donnée n'est pas incluse dans la clé API gratuite");
  if (!res.ok) throw new Error(`API indisponible (${res.status})`);
  if (!res.headers.get("content-type")?.includes("json")) throw new Error("API non configurée (clé manquante)");

  return (await res.json()) as T;
}

export async function fetchStandings(signal?: AbortSignal): Promise<ApiStanding[]> {
  const data = await apiGet<{ standings?: { type: string; table: ApiStanding[] }[] }>("/competitions/CL/standings", signal);
  const total = data.standings?.find((s) => s.type === "TOTAL");
  if (!total?.table.length) throw new Error("aucun classement disponible pour la saison en cours");
  return total.table;
}

export async function fetchCompetitionTeams(signal?: AbortSignal): Promise<ApiTeam[]> {
  const data = await apiGet<{ teams?: ApiTeam[] }>("/competitions/CL/teams", signal);
  return data.teams ?? [];
}

export function fetchTeam(id: number, signal?: AbortSignal): Promise<ApiTeamDetail> {
  return apiGet<ApiTeamDetail>(`/teams/${id}`, signal);
}

const MATCHES_CACHE_MS = 30_000;
let matchesCache: { at: number; promise: Promise<ApiMatch[]> } | undefined;

export function fetchMatches(signal?: AbortSignal): Promise<ApiMatch[]> {
  if (matchesCache && Date.now() - matchesCache.at < MATCHES_CACHE_MS) return matchesCache.promise;
  const promise = apiGet<{ matches?: ApiMatch[] }>("/competitions/CL/matches")
    .then((data) => data.matches ?? [])
    .catch((e: unknown) => {
      matchesCache = undefined;
      throw e;
    });
  matchesCache = { at: Date.now(), promise };
  return signal ? Promise.race([promise, abortPromise(signal)]) : promise;
}

export function clearMatchesCache(): void {
  matchesCache = undefined;
}

function abortPromise(signal: AbortSignal): Promise<never> {
  return new Promise((_, reject) => {
    if (signal.aborted) reject(new DOMException("Aborted", "AbortError"));
    signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
  });
}