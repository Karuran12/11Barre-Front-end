import { standingsMock } from "../mocks/standings";
import { matchesMock, clubsMock, ticketsMock } from "../mocks/ldc";
// Si VITE_API_URL est défini, on appelle le back ; sinon on utilise les mocks.
const API_URL = import.meta.env.VITE_API_URL;
async function fetchOrMock(path, mock) {
    if (!API_URL) {
        await new Promise((r) => setTimeout(r, 300)); // simule le réseau
        return mock;
    }
    const res = await fetch(`${API_URL}${path}`);
    if (!res.ok)
        throw new Error(`Erreur serveur (${res.status})`);
    return res.json();
}
export const getStandings = () => fetchOrMock("/standings", standingsMock);
export const getResults = (matchday) => fetchOrMock(`/matches?matchday=${matchday}`, matchesMock.filter((m) => m.matchday === matchday && m.homeScore !== undefined));
export const getUpcoming = () => fetchOrMock("/matches/upcoming", matchesMock.filter((m) => m.homeScore === undefined));
export const getClubs = () => fetchOrMock("/clubs", clubsMock);
export const getTickets = () => fetchOrMock("/tickets", ticketsMock);
// TODO(back) : POST /clubs/:id/alerts et POST /tickets/:id/waitlist
