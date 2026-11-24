import { CLUBS } from "../mocks/clubs";
import type { Club } from "../types/club";
import type { ApiTeam } from "../services/footballData";

function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/ø/g, "o")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\b(fc|cf|ac|afc|ssc|sk|fk|sc|kv|cp|club|de|rc)\b/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function clubKeys(club: Club): Set<string> {
  return new Set([club.name, club.shortName, ...(club.aliases ?? [])].map(normalize));
}

function teamKeys(team: ApiTeam): string[] {
  return [team.name, team.shortName, team.tla].filter((n): n is string => Boolean(n)).map(normalize);
}

export function findApiTeam(club: Club, teams: ApiTeam[]): ApiTeam | undefined {
  const keys = clubKeys(club);
  return (
    teams.find((t) => club.fdId !== undefined && t.id === club.fdId) ??
    teams.find((t) => teamKeys(t).some((k) => keys.has(k)))
  );
}

export function findClub(team: ApiTeam): Club | undefined {
  const keys = teamKeys(team);
  return CLUBS.find((c) => c.fdId === team.id) ?? CLUBS.find((c) => keys.some((k) => clubKeys(c).has(k)));
}