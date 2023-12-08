import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../navbar/Navbar";
import "./home.scss";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { IArticle } from "../../types/api";
import moment from "moment";

function Home() {
  const [topStoriesArticles, setTopStoriesArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8000/articles/?keyword=biden&country=US"
      );
      const data = await response.json();
      const mappedData = data.map((articles: any) => ({
        url: articles.url,
        title: articles.title,
        domain: articles.domain,
        seenDate: moment
          .utc(articles.seen_date, "YYYYMMDDTHHmmssZ", true)
          .format("DD MMM"),
        imgUrl: articles.img_url,
      }));
      setTopStoriesArticles(mappedData);
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
                <h4>{article.title}</h4>
                <span>{article.domain}</span>
                <span>{`, ${article.seenDate}`}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="container" id="headlines"></div>
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
