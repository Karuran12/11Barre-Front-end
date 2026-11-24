import { CLUBS } from "../mocks/clubs";
import { standingsMock } from "../mocks/standings";
import { matchesMock } from "../mocks/ldc";

export type ClubSummary = {
  id: string;
  name: string;
  rank: number;
  points: number;
  form: string[];
  nextMatch: string;
};

export function ordinal(n: number): string {
  return n === 1 ? "1er" : `${n}e`;
}

export function getNextMatch(clubId: string): string | undefined {
  const m = matchesMock.find((x) => x.homeScore === undefined && (x.homeId === clubId || x.awayId === clubId));
  return m && `${m.home} – ${m.away} · ${m.date.toLowerCase()}, ${m.time}`;
}

export function getClubSummary(clubId: string): ClubSummary | undefined {
  const club = CLUBS.find((c) => c.id === clubId);
  const row = standingsMock.find((r) => r.clubId === clubId);
  if (!club || !row) return undefined;

  return {
    id: club.id,
    name: club.name,
    rank: row.rank,
    points: row.points,
    form: row.form,
    nextMatch: getNextMatch(club.id) ?? "Prochain match à confirmer",
  };
}

// Liste utilisée par la page d'accueil pour afficher les clubs dans l'ordre alphabétique
export function getAllClubSummaries(): ClubSummary[] {
  return CLUBS.map((c) => getClubSummary(c.id))
    .filter((s): s is ClubSummary => s !== undefined)
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
}