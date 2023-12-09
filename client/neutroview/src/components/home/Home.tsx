import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../navbar/Navbar";
import "./home.scss";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { IArticle } from "../../types/api";
import moment from "moment";
import {
  getArticlesApiUrl,
  mapArticleToJson,
} from "../../services/ArticleService";

function Home() {
  const [topStoriesArticles, setTopStoriesArticles] = useState<IArticle[]>([]);
  const [worldNewsArticles, setWorldNewsArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseTopStories = await fetch(
        getArticlesApiUrl({
          keyword: "biden trump",
          country: "US",
          category: "",
          timespan: "1d",
          num_records: 10,
          domain: "",
        })
      );
      const responseWorldNews = await fetch(
        getArticlesApiUrl({
          keyword: "",
          country: "",
          category: "",
          timespan: "1m",
          num_records: 5,
          domain: "nytimes.com",
        })
      );
      setTopStoriesArticles(mapArticleToJson(await responseTopStories.json()));
      setWorldNewsArticles(mapArticleToJson(await responseWorldNews.json()));
    };
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="main-container">
        <div className="container" id="top-news-stories">
          <div id="timeline-container">
            <div id="timeline-img"></div>
            <h2>Israel Palestine War</h2>
            <div id="timeline-desc">
              <span>
                A timeline of news events of the most recent escalation in
                violence of the Israeli-Palestinian conflict.
              </span>
            </div>
            <div id="timeline-explore">
              <button>Explore Timeline</button>
            </div>
          </div>
          <h2 id="top-news-stories-h2">Top News Stories</h2>
          <div id="news-stories-container">
            {topStoriesArticles.map((article) => (
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
        <div className="container" id="headlines">
          <div
            id="headline-container-main"
            style={{
              backgroundImage: `url(${topStoriesArticles[0]?.imgUrl})`,
            }}
          >
            <div id="headline-container-main-title">
              <h1>
                <a href={topStoriesArticles[0]?.url} target="_blank">
                  {topStoriesArticles[0]?.title}
                </a>
              </h1>
            </div>
          </div>
          <div className="news-story-container-main">
            {worldNewsArticles.map((article) => (
              <div className="story-container-long">
                <div className="story-container-long-desc">
                  <h4><a href={article.url}>{article.title}</a></h4>
                  <span>{`${article.seenDate}, ${article.domain}`}</span>
                </div>
                <img src={article.imgUrl}></img>
              </div>
            ))}
          </div>
        </div>
        <div className="container" id="local-news">
          <h2>Daily Local News</h2>
          <div className="container-title">
            <span className="title-smaller">
              Discover stories happening right in your city.
            </span>
          </div>
          <div id="local-news-search-container">
            <div id="local-news-search">
              <input type="text" placeholder="Enter your city's name" />
            </div>
            <div id="local-news-search-button">
              <button>Submit</button>
            </div>
          </div>
          <div className="divider-thick"></div>
          <div id="set-location-container">
            <button>
              <FontAwesomeIcon icon={faLocationDot} /> Set Location
            </button>
          </div>
          <div className="divider-thin"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
