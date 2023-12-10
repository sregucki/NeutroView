import React, { useEffect, useState } from "react";
import {
  getArticlesApiUrl,
  mapArticleToJson,
} from "../../../services/ArticleService";
import { IArticle } from "../../../types/ApiTypes";
import "../home.scss";

function Headlines() {
  const [headlines, setWorldNewsArticles] = useState<IArticle[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      let headlines;
      try {
        headlines = await fetch(
          getArticlesApiUrl({
            keyword: "",
            country: "",
            category: "",
            timespan: "1m",
            num_records: 5,
            domain: "nytimes.com",
          })
        );
        setWorldNewsArticles(mapArticleToJson(await headlines?.json()));
      } catch (e) {
        console.error("Failed to fetch headlines articles from api");
      }
    };
    fetchData();
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
          <div className="story-container-long">
            <div className="story-container-long-desc">
              <h4>
                <a href={article.url}>{article.title}</a>
              </h4>
              <span>{`${article.seenDate}, ${article.domain}`}</span>
            </div>
            <img src={article.imgUrl}></img>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Headlines;
