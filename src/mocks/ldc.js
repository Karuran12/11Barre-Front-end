// Mocks : à remplacer par l'API (voir LDC/api.ts)
export const matchesMock = [
    { id: 1, matchday: 1, date: "17 sept.", time: "21:00", home: "Arsenal", away: "Inter", homeScore: 2, awayScore: 1 },
    { id: 2, matchday: 1, date: "17 sept.", time: "21:00", home: "PSG", away: "Liverpool", homeScore: 1, awayScore: 0 },
    { id: 3, matchday: 2, date: "1 oct.", time: "21:00", home: "Bayern Munich", away: "Real Madrid", homeScore: 3, awayScore: 1 },
    { id: 4, matchday: 2, date: "1 oct.", time: "21:00", home: "FC Barcelone", away: "PSG", homeScore: 1, awayScore: 2 },
    { id: 5, matchday: 3, date: "22 oct.", time: "21:00", home: "Inter", away: "Dortmund", homeScore: 2, awayScore: 0 },
    { id: 6, matchday: 3, date: "22 oct.", time: "21:00", home: "Liverpool", away: "Arsenal", homeScore: 0, awayScore: 1 },
    { id: 7, matchday: 4, date: "5 nov.", time: "21:00", home: "PSG", away: "Bayern Munich", homeScore: 2, awayScore: 3 },
    { id: 8, matchday: 4, date: "5 nov.", time: "21:00", home: "Real Madrid", away: "Inter", homeScore: 2, awayScore: 2 },
    { id: 9, matchday: 4, date: "6 nov.", time: "21:00", home: "Arsenal", away: "Benfica", homeScore: 2, awayScore: 0 },
    { id: 10, matchday: 4, date: "6 nov.", time: "21:00", home: "Juventus", away: "FC Barcelone", homeScore: 1, awayScore: 2 },
    { id: 11, matchday: 5, date: "Mar. 25 nov.", time: "21:00", home: "FC Barcelone", away: "Dortmund" },
    { id: 12, matchday: 5, date: "Mar. 25 nov.", time: "21:00", home: "Liverpool", away: "Juventus" },
    { id: 13, matchday: 5, date: "Mer. 26 nov.", time: "21:00", home: "PSG", away: "Manchester City" },
];
export const clubsMock = [
    { id: "psg", name: "PSG", rank: 5, points: 9, form: ["V", "V", "V", "D"], nextMatch: "PSG – Manchester City · mer. 26 nov., 21:00" },
    { id: "real", name: "Real Madrid", rank: 4, points: 10, form: ["V", "V", "N", "V"], nextMatch: "Prochain match à confirmer" },
    { id: "barca", name: "FC Barcelone", rank: 7, points: 9, form: ["V", "V", "D", "V"], nextMatch: "FC Barcelone – Dortmund · mar. 25 nov., 21:00" },
    { id: "bayern", name: "Bayern Munich", rank: 2, points: 12, form: ["V", "V", "V", "V"], nextMatch: "Bayern Munich – Arsenal · mer. 26 nov., 21:00" },
    { id: "arsenal", name: "Arsenal", rank: 1, points: 12, form: ["V", "V", "V", "V"], nextMatch: "Bayern Munich – Arsenal · mer. 26 nov., 21:00" },
    { id: "inter", name: "Inter", rank: 3, points: 10, form: ["V", "N", "V", "V"], nextMatch: "Prochain match à confirmer" },
    { id: "liverpool", name: "Liverpool", rank: 6, points: 9, form: ["V", "V", "D", "V"], nextMatch: "Liverpool – Juventus · mar. 25 nov., 21:00" },
    { id: "juve", name: "Juventus", rank: 22, points: 4, form: ["D", "N", "V", "D"], nextMatch: "Liverpool – Juventus · mar. 25 nov., 21:00" },
];
export const ticketsMock = [
    { id: 1, match: "PSG – Manchester City", when: "Mer. 26 nov. · 21:00", venue: "Parc des Princes", status: "available", priceFrom: 65 },
    { id: 2, match: "FC Barcelone – Dortmund", when: "Mar. 25 nov. · 21:00", venue: "Spotify Camp Nou", status: "low", priceFrom: 89 },
    { id: 3, match: "Bayern Munich – Arsenal", when: "Mer. 26 nov. · 21:00", venue: "Allianz Arena", status: "soldout" },
];
