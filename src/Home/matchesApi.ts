import { findClub } from "../Club/clubMatching";
import { fetchMatches, type ApiMatch, type ApiTeam } from "../services/footballData";
import type { HomeMatches } from "../types/home";

const LIVE = new Set(["IN_PLAY", "PAUSED", "LIVE"]);
const UPCOMING = new Set(["SCHEDULED", "TIMED"]);
const MAX_ROWS = 6;

const dayFmt = new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", month: "short", timeZone: "Europe/Paris" });
const timeFmt = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" });

const day = (iso: string) => {
  const s = dayFmt.format(new Date(iso));
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const teamId = (team: ApiTeam) => findClub(team)?.id ?? team.shortName ?? team.name;

function liveStatus(m: ApiMatch): string {
  if (m.status === "PAUSED") return "MI-TEMPS";
  return m.minute ? `EN DIRECT ${m.minute}'` : "EN DIRECT";
}

export async function fetchHomeMatches(signal?: AbortSignal): Promise<HomeMatches> {
  const all = await fetchMatches(signal);
  const byDate = (a: ApiMatch, b: ApiMatch) => a.utcDate.localeCompare(b.utcDate);
  const score = (n: number | null) => n ?? 0;

  return {
    source: "api",
    live: all
      .filter((m) => LIVE.has(m.status))
      .map((m) => ({
        id: String(m.id),
        homeId: teamId(m.homeTeam),
        awayId: teamId(m.awayTeam),
        homeScore: score(m.score.fullTime.home),
        awayScore: score(m.score.fullTime.away),
        status: liveStatus(m),
      })),
    upcoming: all
      .filter((m) => UPCOMING.has(m.status))
      .sort(byDate)
      .slice(0, MAX_ROWS)
      .map((m) => ({
        id: String(m.id),
        homeId: teamId(m.homeTeam),
        awayId: teamId(m.awayTeam),
        date: day(m.utcDate),
        time: timeFmt.format(new Date(m.utcDate)),
      })),
    results: all
      .filter((m) => m.status === "FINISHED")
      .sort(byDate)
      .slice(-MAX_ROWS)
      .reverse()
      .map((m) => ({
        id: String(m.id),
        homeId: teamId(m.homeTeam),
        awayId: teamId(m.awayTeam),
        homeScore: score(m.score.fullTime.home),
        awayScore: score(m.score.fullTime.away),
        date: day(m.utcDate),
      })),
  };
}