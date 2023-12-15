import { useEffect, useRef, useState } from "react";
import {
  fetchArticlesFromApi,
  getTopArticleProviders,
} from "../../services/ArticleService";
import { IArticle } from "../../types/ApiTypes";
import { handleImageError } from "../../utilities/ImageUtils";
import NavbarLite from "../navbar/NavbarLite";
import "./search.scss";

function Search() {
  const wasCalled = useRef(false);
  const keyword = window.location.href.split("keyword")[1].replace("=", "");
  const [articles, setArticles] = useState<IArticle[]>([]);
  useEffect(() => {
    if (wasCalled.current) return;
    wasCalled.current = true;
    fetchArticlesFromApi(
      {
        keyword: keyword,
        country: "UK,US",
        category: "",
        timespan: "1m",
        num_records: 10,
        domain: getTopArticleProviders(),
      },
      setArticles
    );
  }, []);

  return (
    <div>
      <NavbarLite />
      <div className="main-container-search">
        <div className="news-story-container-main">
          {articles.map((article) => (
            <div className="story-container-long" key={article.id}>
              <div className="story-container-long-desc">
                <h4>
                  <a href={article.url}>{article.title}</a>
                </h4>
                <span>{`${article.seenDate}, ${article.domain}`}</span>
              </div>
              <img src={article.imgUrl}
              onError={handleImageError}></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
