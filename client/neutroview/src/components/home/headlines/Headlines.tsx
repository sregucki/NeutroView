import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import {
  fetchArticlesFromApi,
  getTopArticleProviders,
} from "../../../services/ArticleService";
import { fetchTextAnalysisFromApi } from "../../../services/TextAnalysisService";
import { IArticle, ITextAnalysis } from "../../../types/ApiTypes";
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
            <a href={headlines[0]?.url} target="_blank" rel="noreferrer">
              {headlines[0]?.title}
            </a>
          </h1>
        </div>
      </div>
      <div className="news-story-container-main">
        {headlines.slice(1).map((article) => (
          <GetArticle {...article} key={article.id} />
        ))}
      </div>
    </div>
  );
}

export function GetArticle(article: IArticle) {
  const [isHovered, setIsHovered] = useState(false);
  const [textAnalysis, setTextAnalysis] = useState<ITextAnalysis>();
  const wasCalled = useRef(false);
  const mostFrequentWords = textAnalysis?.most_common_words
    ? Object.keys(textAnalysis?.most_common_words)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" · ")
    : [];
  useEffect(() => {
    if (wasCalled.current) return;
    wasCalled.current = true;
    fetchTextAnalysisFromApi(article.url || "", setTextAnalysis);
  }, [textAnalysis]);
  return (
    <div className="story-container-long" key={article.id}>
      <div className="story-container-long-desc">
        <div className="story-container-long-most-frequent-words">
          <span className="most-frequent-words">{mostFrequentWords}</span>
        </div>
        <div className="story-container-long-title">
          <a
            href={article.url}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <h4>
              {highlitghtKeywords(article.title || "", article.keywords || [])}
            </h4>
          </a>
        </div>
        <div className="story-container-long-meta">
          <div className="sentiment-bar-main">
            <div className="tooltiptext">
              <ul>
                <li>
                  <FontAwesomeIcon
                    icon={faSquare}
                    style={{ color: "#802727" }}
                  />{" "}
                  Negative:{" "}
                  {`${((textAnalysis?.sentiment["neg"] || 0) * 100).toFixed(
                    1
                  )}%`}
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faSquare}
                    style={{ color: "#ffffff" }}
                  />{" "}
                  Neutral:{" "}
                  {`${((textAnalysis?.sentiment["neu"] || 0) * 100).toFixed(
                    1
                  )}%`}
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faSquare}
                    style={{ color: "#204986" }}
                  />{" "}
                  Positive:{" "}
                  {`${((textAnalysis?.sentiment["pos"] || 0) * 100).toFixed(
                    1
                  )}%`}
                </li>
              </ul>
            </div>
            <div
              className="sentiment-bar-negative"
              style={{
                width: `${(textAnalysis?.sentiment["neg"] || 0) * 100}%`,
              }}
            ></div>
            <div
              className="sentiment-bar-neutral"
              style={{
                width: `${(textAnalysis?.sentiment["neu"] || 0) * 100}%`,
              }}
            ></div>
            <div
              className="sentiment-bar-positive"
              style={{
                width: `${(textAnalysis?.sentiment["pos"] || 0) * 100}%`,
              }}
            ></div>
          </div>
          <div className="meta-desc">
            <span>{`${article.seenDate}, ${article.domain}`}</span>
          </div>
        </div>
      </div>
      <img
        alt="article"
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
    text = text.replace(
      regex,
      `<span class="highlight-keyword">${text.match(regex)?.[0]}</span>`
    );
  });
  return <span dangerouslySetInnerHTML={{ __html: text }}></span>;
}

export default Headlines;
