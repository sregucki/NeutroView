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
        <a
          href={article.url}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h4>
            {highlitghtKeywords(article.title || "", article.keywords || [])}
          </h4>
        </a>
        <span className="story-container-long-meta">{`${article.seenDate}, ${article.domain}`}</span>
      </div>
      <img
        src={article.imgUrl}
        onError={handleImageError}
        className={isHovered ? "img-opacity-low" : "opacity-normal"}
      ></img>
    </div>
  );
}

function highlitghtKeywords(text: string, keywords: string[]) {
  keywords.forEach((keyword) => {
    const regex = new RegExp(keyword, "gi");
    text = text.replace(regex, `<span class="highlight-keyword">${text.match(regex)?.[0]}</span>`);
  });
  return <span dangerouslySetInnerHTML={{ __html: text }}></span>;
}

export default Headlines;
