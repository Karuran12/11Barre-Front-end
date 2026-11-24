import { useState, type ReactElement } from "react";
import SegmentedControl, { type SegmentOption } from "../../UI/SegmentedControl";
import FeaturedArticle from "./FeaturedArticle";
import ArticleItem from "./ArticleItem";
import type { NewsFeed, NewsPeriod, NewsTab } from "../../types/home";
import "../../styles/Home/News.css";

const PERIODS: SegmentOption<NewsTab>[] = [
  { value: "today", label: "Aujourd'hui" },
  { value: "week", label: "Cette semaine" },
];

type Props = {
  feeds: Record<NewsPeriod, NewsFeed>;
  clubFeed?: { label: string; feed: NewsFeed };
};

// Bloc "Les actus": l'équipe favorite d'abord, la LDC toujours accessible
function NewsSection({ feeds, clubFeed }: Props): ReactElement {
  const [tab, setTab] = useState<NewsTab>(clubFeed ? "club" : "today");
  const options = clubFeed ? [{ value: "club" as const, label: clubFeed.label }, ...PERIODS] : PERIODS;
  const feed = tab === "club" && clubFeed ? clubFeed.feed : feeds[tab === "club" ? "today" : tab];

  return (
    <section className={clubFeed ? "home-news has-club" : "home-news"} aria-labelledby="home-news-title">
      <div className="home-news-head">
        <h2 id="home-news-title" className="home-page-title">
          <span className="home-only-desktop">Les actus</span>
          <span className="home-only-mobile">Les actus du jour</span>
        </h2>
        <SegmentedControl label="Actus affichées" options={options} value={tab} onChange={setTab} />
      </div>

      <FeaturedArticle article={feed.featured} tagVariant={tab === "club" ? "club" : "accent"} />

      <ul className="home-articles">
        {feed.articles.map((a) => (
          <ArticleItem key={a.id} article={a} />
        ))}
      </ul>
    </section>
  );
}

export default NewsSection;