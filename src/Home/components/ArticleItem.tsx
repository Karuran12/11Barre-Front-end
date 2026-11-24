import type { ReactElement } from "react";
import Picture from "../../UI/Picture";
import type { Article } from "../../types/home";

type Props = {
  article: Article;
};

// Ligne d'article: vignette + rubrique, titre, date
function ArticleItem({ article }: Props): ReactElement {
  return (
    <li className="home-article">
      <Picture src={article.image} alt="" className="home-article-img" />
      <div className="home-article-texts">
        <p className="home-article-category">{article.category}</p>
        <h3 className="home-article-title">{article.title}</h3>
        <p className="home-meta-text home-article-time">{article.publishedAgo}</p>
      </div>
    </li>
  );
}

export default ArticleItem;