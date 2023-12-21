import { useEffect, useRef, useState } from "react";
import {
  fetchArticlesFromApi,
  getTopArticleProviders,
} from "../../../services/ArticleService";
import { IArticle } from "../../../types/ApiTypes";
import { handleImageError } from "../../../utilities/ImageUtils";
import "../home.scss";

function Headlines() {
  const wasCalled = useRef(false);
  const [headlines, setWorldNewsArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    if (wasCalled.current) return;
    wasCalled.current = true;
    fetchArticlesFromApi(
      {
        keyword: "european union",
        country: "US,UK",
        timespan: "1w",
        num_records: 5,
        domain: getTopArticleProviders(),
      },
      setWorldNewsArticles
    );
  }, []);

  return (
    <div className="container" id="headlines">
      <div
        id="headline-container-main"
        style={{
          backgroundImage: `url(${headlines[0]?.imgUrl})`,
        }}
      >
        <div id="headline-container-main-title">
          <h1>
            <a href={headlines[0]?.url} target="_blank">
              {headlines[0]?.title}
            </a>
          </h1>
        </div>
      </div>
      <div className="news-story-container-main">
        {headlines.map((article) => (
          <GetArticle {...article} key={article.id} />
        ))}
      </div>
    </div>
  );
}

export function GetArticle(article: IArticle) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="story-container-long" key={article.id}>
      <div className="story-container-long-desc">
        <h4>
          <a
            href={article.url}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {article.title}
          </a>
        </h4>
        <span>{`${article.seenDate}, ${article.domain}`}</span>
      </div>
      <img
        src={article.imgUrl}
        onError={handleImageError}
        className={isHovered ? "img-opacity-low" : "opacity-normal"}
      ></img>
    </div>
  );
}

export default Headlines;
