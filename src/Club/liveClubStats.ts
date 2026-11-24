import { findClub } from "./clubMatching";
import { getAllClubSummaries, type ClubSummary } from "./clubStats";
import { fetchMatches, fetchStandings, type ApiMatch, type ApiStanding } from "../services/footballData";

export type ClubSummaries = {
  source: "api" | "mock";
  summaries: ClubSummary[];
};

const CACHE_MS = 60_000;
const UPCOMING = new Set(["SCHEDULED", "TIMED", "IN_PLAY", "PAUSED", "LIVE"]);

const dateFmt = new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", month: "short", timeZone: "Europe/Paris" });
const timeFmt = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" });

const teamName = (team: ApiMatch["homeTeam"]) => findClub(team)?.name ?? team.shortName ?? team.name;

// V / N / D des 5 derniers matchs terminés de l'équipe
function formOf(teamId: number, finished: ApiMatch[]): string[] {
  return finished
    .filter((m) => m.homeTeam.id === teamId || m.awayTeam.id === teamId)
    .slice(-5)
    .map((m) => {
      const home = m.score.fullTime.home ?? 0;
      const away = m.score.fullTime.away ?? 0;
      const mine = m.homeTeam.id === teamId ? home : away;
      const theirs = m.homeTeam.id === teamId ? away : home;
      return mine > theirs ? "V" : mine === theirs ? "N" : "D";
    });
}

function nextMatchOf(teamId: number, upcoming: ApiMatch[]): string {
  const m = upcoming.find((x) => x.homeTeam.id === teamId || x.awayTeam.id === teamId);
  if (!m) return "Prochain match à confirmer";
  const date = new Date(m.utcDate);
  return `${teamName(m.homeTeam)} – ${teamName(m.awayTeam)} · ${dateFmt.format(date)}, ${timeFmt.format(date)}`;
}

async function loadFromApi(): Promise<ClubSummaries> {
  const [table, matches] = await Promise.all([fetchStandings(), fetchMatches().catch(() => [] as ApiMatch[])]);
  const byDate = (a: ApiMatch, b: ApiMatch) => a.utcDate.localeCompare(b.utcDate);
  const finished = matches.filter((m) => m.status === "FINISHED").sort(byDate);
  const upcoming = matches.filter((m) => UPCOMING.has(m.status)).sort(byDate);

  const fromApi = new Map<string, ClubSummary>();
  table.forEach((row: ApiStanding) => {
    const club = findClub(row.team);
    if (!club) return;
    const form = matches.length ? formOf(row.team.id, finished) : (row.form?.split(",") ?? []);
    fromApi.set(club.id, {
      id: club.id,
      name: club.name,
      rank: row.position,
      points: row.points,
      form,
      nextMatch: nextMatchOf(row.team.id, upcoming),
    });
  });

  const summaries = getAllClubSummaries().map((s) => fromApi.get(s.id) ?? s);
  return { source: "api", summaries };
}

let cache: { at: number; promise: Promise<ClubSummaries> } | undefined;

export function loadClubSummaries(force = false): Promise<ClubSummaries> {
  if (!force && cache && Date.now() - cache.at < CACHE_MS) return cache.promise;

  const promise = loadFromApi().catch((): ClubSummaries => {
    cache = undefined;
    return { source: "mock", summaries: getAllClubSummaries() };
  });
  cache = { at: Date.now(), promise };
  return promise;
}