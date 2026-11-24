import type { ReactElement } from "react";
import Picture from "../../UI/Picture";
import Tag, { type TagVariant } from "../../UI/Tag";
import type { FeaturedArticle as FeaturedArticleType } from "../../types/home";

type Props = {
  article: FeaturedArticleType;
  tagVariant?: TagVariant;
};

// Article à la une: grande photo, étiquette, méta et titre
function FeaturedArticle({ article, tagVariant = "accent" }: Props): ReactElement {
  return (
    <article className="home-featured">
      <Picture src={article.image} alt="" placeholder="Photo de l'article" className="home-featured-img" />
      <div className="home-featured-meta">
        <Tag label={article.tag} variant={tagVariant} />
        <span className="home-meta-text">
          {article.publishedAgo} · {article.readingTime}
        </span>
      </div>
      <h3 className="home-featured-title">{article.title}</h3>
    </article>
  );
}

export default FeaturedArticle;