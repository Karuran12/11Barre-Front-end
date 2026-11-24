export type NewsPeriod = "today" | "week";
export type NewsTab = "club" | NewsPeriod;

export type FeaturedArticle = {
  id: string;
  tag: string;
  title: string;
  publishedAgo: string;
  readingTime: string;
  image?: string;
};

export type Article = {
  id: string;
  category: string;
  title: string;
  publishedAgo: string;
  image?: string;
};

export type NewsFeed = {
  featured: FeaturedArticle;
  articles: Article[];
};

export type MercatoStatus = "official" | "rumor";

export type MercatoItem = {
  id: string;
  status: MercatoStatus;
  title: string;
};

export type LiveMatch = {
  id: string;
  homeId: string;
  awayId: string;
  homeScore: number;
  awayScore: number;
  status: string; 
};

export type ResultMatch = {
  id: string;
  homeId: string;
  awayId: string;
  homeScore: number;
  awayScore: number;
  date: string;
};

export type HomeMatches = {
  source: "api" | "mock";
  live: LiveMatch[];
  upcoming: UpcomingMatch[];
  results: ResultMatch[];
};

export type UpcomingMatch = {
  id: string;
  homeId: string;
  awayId: string;
  date: string;
  time: string;
};