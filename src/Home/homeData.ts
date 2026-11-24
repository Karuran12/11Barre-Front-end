import { matchesMock } from "../mocks/ldc";
import { liveMatchesMock, mercatoMock, newsMock } from "../mocks/home";
import type { UpcomingMatch } from "../types/home";

export const news = newsMock;
export const mercato = mercatoMock;
export const liveMatches = liveMatchesMock;

export const upcomingMatches: UpcomingMatch[] = matchesMock
  .filter((m) => m.homeScore === undefined)
  .map((m) => ({
    id: String(m.id),
    home: { name: m.home },
    away: { name: m.away },
    date: m.date,
    time: m.time,
  }));