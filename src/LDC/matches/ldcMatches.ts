// Tous les matchs de la Ligue des champions, rangés par journée (phase de ligue)
import { findClub } from "../../Club/clubMatching";
import { loadApiTeams } from "../../Club/crestApi";
import { getClub } from "../../mocks/clubs";
import { matchesMock } from "../../mocks/ldc";
import { clearMatchesCache, fetchMatches, type ApiMatch, type ApiTeam } from "../../services/footballData";

export type MatchState = "finished" | "live" | "upcoming" | "off";

export type MatchSide = {
  clubId?: string;
  name: string;
  crest?: string;
  known: boolean; 
};

export type LdcMatch = {
  id: string;
  state: MatchState;
  statusLabel: string;
  utcDate?: string;
  dayKey: string;
  dayLabel: string;
  time: string;
  home: MatchSide;
  away: MatchSide;
  homeScore?: number;
  awayScore?: number;
  winner?: "home" | "away" | "draw";
  venue?: string;
  city?: string;
  website?: string;
};

export type MatchGroup = {
  key: string;
  short: string;
  label: string;
  phase: string;
  matches: LdcMatch[];
};

export type LdcMatches = {
  source: "api" | "mock";
  season?: string;
  groups: MatchGroup[];
  currentKey?: string;
};

const STAGES: Record<string, { short: string; label: string }> = {
  PLAYOFFS: { short: "Barrages", label: "Barrages" },
  LAST_16: { short: "8es", label: "8es de finale" },
  QUARTER_FINALS: { short: "Quarts", label: "Quarts de finale" },
  SEMI_FINALS: { short: "Demies", label: "Demi-finales" },
  FINAL: { short: "Finale", label: "Finale" },
};
const STAGE_ORDER = ["LEAGUE_STAGE", ...Object.keys(STAGES)];

const LIVE = new Set(["IN_PLAY", "PAUSED", "LIVE"]);
const UPCOMING = new Set(["SCHEDULED", "TIMED"]);
const FINISHED = new Set(["FINISHED", "AWARDED"]);
const OFF: Record<string, string> = { POSTPONED: "Reporté", SUSPENDED: "Suspendu", CANCELLED: "Annulé" };

const TZ = "Europe/Paris";
const dayFmt = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: TZ });
const keyFmt = new Intl.DateTimeFormat("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: TZ });
const timeFmt = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: TZ });

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const ordinal = (n: number) => (n === 1 ? "1re" : `${n}e`);

export function leagueGroup(matchday: number): Omit<MatchGroup, "matches"> {
  return { key: `J${matchday}`, short: `J${matchday}`, label: `${ordinal(matchday)} journée`, phase: "Phase de ligue" };
}

function groupOf(m: ApiMatch): Omit<MatchGroup, "matches"> | undefined {
  const stage = m.stage ?? "LEAGUE_STAGE";
  if (stage === "LEAGUE_STAGE") return m.matchday ? leagueGroup(m.matchday) : undefined;
  const s = STAGES[stage];
  return s && { key: stage, short: s.short, label: s.label, phase: "Phase finale" };
}

function side(team: ApiMatch["homeTeam"]): MatchSide {
  if (!team.id || !team.name) return { name: "À déterminer", known: false };
  const club = findClub(team);
  return { clubId: club?.id, name: club?.name ?? team.shortName ?? team.name, crest: team.crest, known: true };
}

function state(m: ApiMatch): { state: MatchState; statusLabel: string } {
  if (LIVE.has(m.status)) {
    if (m.status === "PAUSED") return { state: "live", statusLabel: "Mi-temps" };
    return { state: "live", statusLabel: m.minute ? `En direct ${m.minute}'` : "En direct" };
  }
  if (FINISHED.has(m.status)) return { state: "finished", statusLabel: "Terminé" };
  if (UPCOMING.has(m.status)) return { state: "upcoming", statusLabel: "À venir" };
  return { state: "off", statusLabel: OFF[m.status] ?? "Reporté" };
}

function winnerOf(m: ApiMatch, home?: number, away?: number): LdcMatch["winner"] {
  const w = m.score.winner;
  if (w === "HOME_TEAM") return "home";
  if (w === "AWAY_TEAM") return "away";
  if (w === "DRAW") return "draw";
  if (home === undefined || away === undefined) return undefined;
  return home > away ? "home" : home < away ? "away" : "draw";
}

function toMatch(m: ApiMatch, teams: Map<number, ApiTeam>): LdcMatch {
  const date = new Date(m.utcDate);
  const st = state(m);
  const hasScore = st.state === "finished" || st.state === "live";
  const homeScore = hasScore ? m.score.fullTime.home ?? 0 : undefined;
  const awayScore = hasScore ? m.score.fullTime.away ?? 0 : undefined;
  const home = side(m.homeTeam);
  const homeTeam = m.homeTeam.id ? teams.get(m.homeTeam.id) : undefined;
  const clubVenue = homeTeam?.venue ?? undefined;
  const venue = m.venue ?? clubVenue;
  const atHome = Boolean(venue) && venue === clubVenue;

  return {
    id: String(m.id),
    ...st,
    utcDate: m.utcDate,
    dayKey: keyFmt.format(date),
    dayLabel: capitalize(dayFmt.format(date)),
    time: timeFmt.format(date),
    home,
    away: side(m.awayTeam),
    homeScore,
    awayScore,
    winner: st.state === "finished" ? winnerOf(m, homeScore, awayScore) : undefined,
    venue,
    city: atHome && home.clubId ? getClub(home.clubId)?.city : undefined,
    website: homeTeam?.website ?? undefined,
  };
}

function seasonLabel(matches: ApiMatch[]): string | undefined {
  const s = matches.find((m) => m.season?.startDate)?.season;
  if (!s?.startDate || !s.endDate) return undefined;
  return `${s.startDate.slice(0, 4)}-${s.endDate.slice(0, 4)}`;
}

function currentKey(groups: MatchGroup[]): string | undefined {
  return (
    groups.find((g) => g.matches.some((m) => m.state === "live"))?.key ??
    groups.find((g) => g.matches.some((m) => m.state === "upcoming"))?.key ??
    groups.at(-1)?.key
  );
}

function groupMatches(items: { group: Omit<MatchGroup, "matches">; match: LdcMatch; order: number }[]): MatchGroup[] {
  const map = new Map<string, MatchGroup & { order: number }>();
  items.forEach(({ group, match, order }) => {
    const g = map.get(group.key) ?? { ...group, matches: [], order };
    g.matches.push(match);
    map.set(group.key, g);
  });
  return [...map.values()].sort((a, b) => a.order - b.order).map(({ order: _order, ...g }) => g);
}

async function loadFromApi(): Promise<LdcMatches> {
  const [all, teamList] = await Promise.all([fetchMatches(), loadApiTeams().catch(() => [] as ApiTeam[])]);
  if (!all.length) throw new Error("aucun match renvoyé par l'API");
  const teams = new Map(teamList.map((t) => [t.id, t]));

  const items = [...all]
    .sort((a, b) => a.utcDate.localeCompare(b.utcDate))
    .flatMap((m) => {
      const group = groupOf(m);
      if (!group) return [];
      const order = STAGE_ORDER.indexOf(m.stage ?? "LEAGUE_STAGE") * 100 + (m.matchday ?? 0);
      return [{ group, match: toMatch(m, teams), order }];
    });

  const groups = groupMatches(items);
  return { source: "api", season: seasonLabel(all), groups, currentKey: currentKey(groups) };
}

type MockMatch = (typeof matchesMock)[number];

function mockSide(clubId: string): MatchSide {
  return { clubId, name: getClub(clubId)?.name ?? clubId, known: true };
}

function fromMock(m: MockMatch): LdcMatch {
  const finished = m.homeScore !== undefined && m.awayScore !== undefined;
  return {
    id: `mock-${m.id}`,
    state: finished ? "finished" : "upcoming",
    statusLabel: finished ? "Terminé" : "À venir",
    dayKey: m.date,
    dayLabel: capitalize(m.date),
    time: m.time,
    home: mockSide(m.homeId),
    away: mockSide(m.awayId),
    homeScore: m.homeScore,
    awayScore: m.awayScore,
    winner: finished ? (m.homeScore! > m.awayScore! ? "home" : m.homeScore! < m.awayScore! ? "away" : "draw") : undefined,
  };
}

function loadMock(): LdcMatches {
  const groups = groupMatches(matchesMock.map((m) => ({ group: leagueGroup(m.matchday), match: fromMock(m), order: m.matchday })));
  return { source: "mock", groups, currentKey: currentKey(groups) };
}

const CACHE_MS = 60_000;
let cache: { at: number; promise: Promise<LdcMatches> } | undefined;

export function loadLdcMatches(force = false): Promise<LdcMatches> {
  if (!force && cache && Date.now() - cache.at < CACHE_MS) return cache.promise;
  if (force) clearMatchesCache();
  const promise = loadFromApi().catch(() => {
    cache = undefined;
    return loadMock();
  });
  cache = { at: Date.now(), promise };
  return promise;
}

export function outcomeFor(match: LdcMatch, clubId: string | undefined): "V" | "N" | "D" | undefined {
  if (!clubId || !match.winner) return undefined;
  const isHome = match.home.clubId === clubId;
  if (!isHome && match.away.clubId !== clubId) return undefined;
  if (match.winner === "draw") return "N";
  return (match.winner === "home") === isHome ? "V" : "D";
}

export const involves = (match: LdcMatch, clubId: string | undefined) =>
  Boolean(clubId) && (match.home.clubId === clubId || match.away.clubId === clubId);