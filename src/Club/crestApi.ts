// Logos officiels des clubs via l'API football-data.org.
// - Un seul appel pour les 36 clubs, gardé 24 h dans le navigateur.
// - Secours 1 : sans clé ou si l'API ne répond pas, on utilise l'adresse
//   publique du logo quand on connaît l'identifiant du club (fdId).
// - Secours 2 : sinon, ClubCrest affiche les initiales aux couleurs du club.
import { fetchCompetitionTeams, type ApiTeam } from "../services/footballData";
import type { Club } from "../types/club";

const CACHE_KEY = "11barre.crests";
const CACHE_TTL = 24 * 60 * 60 * 1000;

let request: Promise<ApiTeam[]> | null = null;

function readCache(): ApiTeam[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { savedAt, teams } = JSON.parse(raw) as { savedAt: number; teams: ApiTeam[] };
    return Date.now() - savedAt < CACHE_TTL ? teams : null;
  } catch {
    return null;
  }
}

function writeCache(teams: ApiTeam[]): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), teams }));
  } catch {
    // pas grave : on refera l'appel la prochaine fois
  }
}

async function fetchTeams(): Promise<ApiTeam[]> {
  const cached = readCache();
  if (cached) return cached;
  const teams = await fetchCompetitionTeams();
  writeCache(teams);
  return teams;
}

export function loadApiTeams(): Promise<ApiTeam[]> {
  request ??= fetchTeams().catch((e) => {
    request = null;
    throw e;
  });
  return request;
}

export function publicCrestUrl(club: Club): string | undefined {
  return club.fdId ? `https://crests.football-data.org/${club.fdId}.png` : undefined;
}