import { useEffect, useState } from "react";
import {
  getArticlesApiUrl,
  mapArticleToJson,
} from "../../../services/ArticleService";
import { IArticle } from "../../../types/ApiTypes";
import "../home.scss";

function TopStories() {
  const [TopStories, setTopStories] = useState<IArticle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let responseTopStories;
      try {
        responseTopStories = await fetch(
          getArticlesApiUrl({
            keyword: "biden trump",
            country: "US",
            category: "",
            timespan: "1d",
            num_records: 10,
            domain: "",
          })
        );
        setTopStories(mapArticleToJson(await responseTopStories?.json()));
      } catch (e) {
        console.error("Failed to fetch top stories articles from api");
      }
    };
    fetchData();
  });
  return (
    <div className="container" id="top-news-stories">
      <div id="timeline-container">
        <div id="timeline-img"></div>
        <h2>Israel Palestine War</h2>
        <div id="timeline-desc">
          <span>
            A timeline of news events of the most recent escalation in violence
            of the Israeli-Palestinian conflict.
          </span>
        </div>
        <div id="timeline-explore">
          <button>Explore Timeline</button>
        </div>
      </div>
      <h2 id="top-news-stories-h2">Top News Stories</h2>
      <div id="news-stories-container">
        {TopStories.map((article) => (
          <div className="story-container-short">
            <h4>
              <a href={article.url} target="_blank">
                {article.title}
              </a>
            </h4>
            <span>{`${article.seenDate}, ${article.domain}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopStories;
