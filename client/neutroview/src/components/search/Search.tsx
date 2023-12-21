import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  fetchArticlesFromApi,
  getTopArticleProviders,
} from "../../services/ArticleService";
import { IArticle } from "../../types/ApiTypes";
import { GetArticle } from "../home/headlines/Headlines";
import NavbarLite from "../navbar/NavbarLite";
import "./search.scss";

function Search() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const location = useLocation();
  let currentLocation: any;
  useEffect(() => {
    if (currentLocation === location) return;
    currentLocation = location;
    const params = getUrlParams(location.search);
    fetchArticlesFromApi(
      {
        keyword: params.get("keyword") || "",
        country: "UK,US",
        category: "",
        timespan: params.get("timespan") || "",
        num_records: 10,
        start_date: params.get("start_date") || "",
        end_date: params.get("end_date") || "",
        domain: getTopArticleProviders(),
      },
      setArticles
    );
  }, [location]);

  return (
    <div>
      <NavbarLite />
      <div className="main-container-search">
        <div className="news-story-container-main">
          {articles
            .map((article) => <GetArticle {...article} key={article.id} />)
            .sort((a, b) => {
              return (
                new Date(b.props.seenDate).getTime() -
                new Date(a.props.seenDate).getTime()
              );
            })}
        </div>
      </div>
    </div>
  );
}

function getUrlParams(url: string) {
  return new URLSearchParams(url);
}

export default Search;
