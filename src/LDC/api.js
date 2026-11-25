import { standingsMock } from "../mocks/standings";
import { loadClubSummaries } from "../Club/liveClubStats";
import { findClub } from "../Club/clubMatching";
import { fetchStandings } from "../services/footballData";
// Si VITE_API_URL est défini, on appelle le back ; sinon on utilise les mocks.
const API_URL = import.meta.env.VITE_API_URL;
async function fetchOrMock(path, mock) {
    if (!API_URL) {
        await new Promise((r) => setTimeout(r, 300));
        return mock;
    }
    const res = await fetch(`${API_URL}${path}`);
    if (!res.ok)
        throw new Error(`Erreur serveur (${res.status})`);
    return res.json();
}

const toRow = (r) => {
    const club = findClub(r.team);
    return {
        rank: r.position,
        clubId: club?.id,
        club: club?.name ?? r.team.shortName ?? r.team.name,
        crest: r.team.crest,
        played: r.playedGames,
        won: r.won,
        drawn: r.draw,
        lost: r.lost,
        diff: r.goalDifference,
        points: r.points,
        form: r.form ? r.form.split(",") : [],
    };
};
export async function getStandings() {
    try {
        const table = await fetchStandings();
        return { source: "api", rows: table.map(toRow) };
    }
    catch {
        const rows = await fetchOrMock("/standings", standingsMock);
        return { source: "mock", rows };
    }
}
// Clubs avec classement, points, forme et prochain match (API si clé configurée, sinon démo)
export const getClubs = (force = false) => loadClubSummaries(force);
