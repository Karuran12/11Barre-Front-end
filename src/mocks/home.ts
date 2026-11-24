import type { LiveMatch, MercatoItem, NewsFeed, NewsPeriod } from "../types/home";

export const newsMock: Record<NewsPeriod, NewsFeed> = {
  today: {
    featured: {
      id: "soiree-europeenne",
      tag: "Ligue des champions",
      title: "Soirée européenne: ce qu'il faut retenir des huit matchs d'hier",
      publishedAgo: "Il y a 2 h",
      readingTime: "4 min de lecture",
    },
    articles: [
      {
        id: "qualif-directe",
        category: "Phase de ligue",
        title: "Qualification directe: les équipes en bonne position avant la 5e journée",
        publishedAgo: "Il y a 3 h",
      },
      {
        id: "infirmerie",
        category: "Infirmerie",
        title: "Le point sur les blessés et suspendus avant ce soir",
        publishedAgo: "Il y a 3 h",
      },
      {
        id: "var",
        category: "Arbitrage",
        title: "Les trois décisions de la VAR qui ont fait parler",
        publishedAgo: "Il y a 3 h",
      },
    ],
  },
  week: {
    featured: {
      id: "bilan-j4",
      tag: "Ligue des champions",
      title: "4e journée : Arsenal et le Bayern font le trou en tête du classement",
      publishedAgo: "Il y a 2 j",
      readingTime: "6 min de lecture",
    },
    articles: [
      {
        id: "equipe-type",
        category: "Phase de ligue",
        title: "L'équipe type de la semaine, poste par poste",
        publishedAgo: "Il y a 3 j",
      },
      {
        id: "barrages",
        category: "Classement",
        title: "Course aux barrages: qui peut encore accrocher le top 24 ?",
        publishedAgo: "Il y a 4 j",
      },
      {
        id: "jeunes",
        category: "Talents",
        title: "Cinq jeunes joueurs qui ont crevé l'écran cette semaine",
        publishedAgo: "Il y a 5 j",
      },
    ],
  },
};

export const mercatoMock: MercatoItem[] = [
  { id: "lyon-attaquant", status: "official", title: "Un attaquant de 21 ans s'engage avec Lyon jusqu'en 2029" },
  { id: "psg-defenseur", status: "rumor", title: "Le PSG suivrait un défenseur central de Bundesliga" },
];

export const liveMatchesMock: LiveMatch[] = [
  { id: "11", homeId: "barca", awayId: "dortmund", homeScore: 1, awayScore: 0, status: "EN DIRECT 67'" },
  { id: "12", homeId: "liverpool", awayId: "napoli", homeScore: 1, awayScore: 1, status: "MI-TEMPS" },
];