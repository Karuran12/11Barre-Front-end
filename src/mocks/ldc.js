import { clubName } from "./clubs";

// MOCKS doit être cohérent avec les données du back (ex. : clubs, id, nom, matchday, date, heure, score, etc.).
// Chaque match garde l'id des clubs (homeId / awayId) et leur nom affiché.
const match = (id, matchday, date, time, homeId, awayId, homeScore, awayScore) => ({
    id, matchday, date, time,
    homeId, awayId,
    home: clubName(homeId),
    away: clubName(awayId),
    homeScore, awayScore,
});

export const matchesMock = [
    match(1, 1, "17 sept.", "21:00", "arsenal", "inter", 2, 1),
    match(2, 1, "17 sept.", "21:00", "psg", "liverpool", 1, 0),
    match(3, 2, "1 oct.", "21:00", "bayern", "real", 3, 1),
    match(4, 2, "1 oct.", "21:00", "barca", "psg", 1, 2),
    match(5, 3, "22 oct.", "21:00", "inter", "dortmund", 2, 0),
    match(6, 3, "22 oct.", "21:00", "liverpool", "arsenal", 0, 1),
    match(7, 4, "5 nov.", "21:00", "psg", "bayern", 2, 3),
    match(8, 4, "5 nov.", "21:00", "real", "inter", 2, 2),
    match(9, 4, "6 nov.", "21:00", "arsenal", "brugge", 2, 0),
    match(10, 4, "6 nov.", "21:00", "napoli", "barca", 1, 2),
    match(11, 5, "Mar. 24 nov.", "21:00", "barca", "dortmund"),
    match(12, 5, "Mar. 24 nov.", "21:00", "liverpool", "napoli"),
    match(13, 5, "Mer. 25 nov.", "21:00", "psg", "mancity"),
    match(14, 5, "Mer. 25 nov.", "21:00", "bayern", "arsenal"),
];

export const ticketsMock = [
    { id: 1, homeId: "psg", awayId: "mancity", match: "PSG – Manchester City", when: "Mer. 25 nov. · 21:00", venue: "Parc des Princes", status: "available", priceFrom: 65 },
    { id: 2, homeId: "barca", awayId: "dortmund", match: "FC Barcelone – Dortmund", when: "Mar. 24 nov. · 21:00", venue: "Spotify Camp Nou", status: "low", priceFrom: 89 },
    { id: 3, homeId: "bayern", awayId: "arsenal", match: "Bayern Munich – Arsenal", when: "Mer. 25 nov. · 21:00", venue: "Allianz Arena", status: "soldout" },
];