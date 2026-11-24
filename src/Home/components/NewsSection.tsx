import { useState, type ReactElement } from "react";
import SegmentedControl, { type SegmentOption } from "../../UI/SegmentedControl";
import FeaturedArticle from "./FeaturedArticle";
import ArticleItem from "./ArticleItem";
import type { NewsFeed, NewsPeriod } from "../../types/home";
import "../../styles/Home/News.css";

const PERIODS: SegmentOption<NewsPeriod>[] = [
  { value: "today", label: "Aujourd'hui" },
  { value: "week", label: "Cette semaine" },
];

type Props = {
  feeds: Record<NewsPeriod, NewsFeed>;
};

// Bloc "Les actus" avec le choix Aujourd'hui / Cette semaine
function NewsSection({ feeds }: Props): ReactElement {
  const [period, setPeriod] = useState<NewsPeriod>("today");
  const feed = feeds[period];

  return (
    <section className="home-news" aria-labelledby="home-news-title">
      <div className="home-news-head">
        <h2 id="home-news-title" className="home-page-title">
          <span className="home-only-desktop">Les actus</span>
          <span className="home-only-mobile">Les actus du jour</span>
        </h2>
        <SegmentedControl label="Période des actus" options={PERIODS} value={period} onChange={setPeriod} />
      </div>

      <FeaturedArticle article={feed.featured} />

      <ul className="home-articles">
        {feed.articles.map((a) => (
          <ArticleItem key={a.id} article={a} />
        ))}
      </ul>
    </section>
  );
}

export default NewsSection;