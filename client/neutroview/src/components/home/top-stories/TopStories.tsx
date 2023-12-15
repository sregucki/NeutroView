import { useEffect, useRef, useState } from "react";
import { fetchArticlesFromApi } from "../../../services/ArticleService";
import { IArticle } from "../../../types/ApiTypes";
import "../home.scss";

function TopStories() {
  const wasCalled = useRef(false);
  const [TopStories, setTopStories] = useState<IArticle[]>([]);

  useEffect(() => {
    if (wasCalled.current) return;
    wasCalled.current = true;
    fetchArticlesFromApi(
      {
        keyword: "biden trump",
        country: "US,UK",
        category: "",
        timespan: "1m",
        num_records: 10,
        domain: "nytimes.com,bbc.co.uk,theguardian.com,cnn.com,foxnews.com",
      },
      setTopStories
    );
  }, []);

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
          <div className="story-container-short" key={article.id}>
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
