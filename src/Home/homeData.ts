import { matchesMock } from "../mocks/ldc";
import { liveMatchesMock, mercatoMock, newsMock } from "../mocks/home";
import type { HomeMatches } from "../types/home";

export const news = newsMock;
export const mercato = mercatoMock;

// Matchs de démonstration (sans clé API), tirés des mocks LDC de Malik.
const liveIds = new Set(liveMatchesMock.map((m) => m.id));
const lastMatchday = Math.max(...matchesMock.filter((m) => m.homeScore !== undefined).map((m) => m.matchday));

export const mockHomeMatches: HomeMatches = {
  source: "mock",
  live: liveMatchesMock,
  upcoming: matchesMock
    .filter((m) => m.homeScore === undefined && !liveIds.has(String(m.id)))
    .map((m) => ({ id: String(m.id), homeId: m.homeId, awayId: m.awayId, date: m.date, time: m.time })),
  results: matchesMock
    .filter((m) => m.matchday === lastMatchday && m.homeScore !== undefined)
    .map((m) => ({
      id: String(m.id),
      homeId: m.homeId,
      awayId: m.awayId,
      homeScore: m.homeScore,
      awayScore: m.awayScore,
      date: m.date,
    })),
};

// Met les matchs de l'équipe favorite en tête de liste.
export function favoriteFirst<T extends { homeId: string; awayId: string }>(list: T[], clubId?: string): T[] {
  if (!clubId) return list;
  const isFav = (m: T) => m.homeId === clubId || m.awayId === clubId;
  return [...list.filter(isFav), ...list.filter((m) => !isFav(m))];
}

// Match en cours ou prochain match d'un club, en texte
export function nextMatchLabel(matches: HomeMatches, clubId: string, clubName: (id: string) => string): string | undefined {
  const plays = (x: { homeId: string; awayId: string }) => x.homeId === clubId || x.awayId === clubId;
  const live = matches.live.find(plays);
  if (live) return `${clubName(live.homeId)} ${live.homeScore}-${live.awayScore} ${clubName(live.awayId)} · ${live.status.toLowerCase()}`;
  const m = matches.upcoming.find(plays);
  return m && `${clubName(m.homeId)} – ${clubName(m.awayId)} · ${m.date.toLowerCase()}, ${m.time}`;
}