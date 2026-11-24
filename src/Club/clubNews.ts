import { getClubSummary, ordinal } from "./clubStats";
import type { Club } from "../types/club";
import type { MercatoItem, NewsFeed } from "../types/home";

function headline(club: Club, rank: number): string {
  if (rank <= 8) return `${club.name} dans le top 8 : la qualification directe à portée de main`;
  if (rank <= 24) return `${club.name} veut sortir de la zone des barrages`;
  return `${club.name} n'a plus le droit à l'erreur en Ligue des champions`;
}

export function buildClubFeed(club: Club): NewsFeed {
  const summary = getClubSummary(club.id);
  const rank = summary?.rank ?? 36;
  const points = summary?.points ?? 0;
  const next = summary?.nextMatch.split(" · ")[0];
  const hasNext = summary !== undefined && !summary.nextMatch.startsWith("Prochain match");

  return {
    featured: {
      id: `${club.id}-une`,
      tag: club.shortName,
      title: headline(club, rank),
      publishedAgo: "Il y a 1 h",
      readingTime: "3 min de lecture",
    },
    articles: [
      {
        id: `${club.id}-avant-match`,
        category: "Avant-match",
        title: hasNext ? `${next}: les compositions probables` : `${club.shortName} : le programme des prochaines semaines`,
        publishedAgo: "Il y a 2 h",
      },
      {
        id: `${club.id}-classement`,
        category: "Classement",
        title: `${ordinal(rank)} avec ${points} pts: où en est ${club.shortName} après 4 journées ?`,
        publishedAgo: "Il y a 5 h",
      },
      {
        id: `${club.id}-infirmerie`,
        category: "Infirmerie",
        title: `${club.shortName}: le point sur les blessés avant la 5e journée`,
        publishedAgo: "Il y a 8 h",
      },
    ],
  };
}

export function buildClubMercato(club: Club): MercatoItem[] {
  return [
    { id: `${club.id}-rumeur`, status: "rumor", title: `${club.shortName} surveillerait un milieu offensif pour janvier` },
  ];
}