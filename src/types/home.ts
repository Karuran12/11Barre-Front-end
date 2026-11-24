export type NewsPeriod = "today" | "week";

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

export type Team = {
  name: string;
  shortName?: string; 
  logo?: string;
};

export type LiveMatch = {
  id: string;
  home: Team;
  away: Team;
  homeScore: number;
  awayScore: number;
  status: string; 
};

export type UpcomingMatch = {
  id: string;
  home: Team;
  away: Team;
  date: string;
  time: string;
};