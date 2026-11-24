import type { ReactElement } from "react";
import Picture from "../../UI/Picture";
import Tag from "../../UI/Tag";
import type { FeaturedArticle as FeaturedArticleType } from "../../types/home";

type Props = {
  article: FeaturedArticleType;
};

// Article à la une: grande photo, étiquette, méta et titre
function FeaturedArticle({ article }: Props): ReactElement {
  return (
    <article className="home-featured">
      <Picture src={article.image} alt="" placeholder="Photo de l'article" className="home-featured-img" />
      <div className="home-featured-meta">
        <Tag label={article.tag} />
        <span className="home-meta-text">
          {article.publishedAgo} · {article.readingTime}
        </span>
      </div>
      <h3 className="home-featured-title">{article.title}</h3>
    </article>
  );
}

export default FeaturedArticle;