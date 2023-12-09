import moment from "moment";
import { IArticleQuery } from "../types/api";
import { ARTICLE_API_BASE_URL } from "../constants/ArticleApiConstants";

export function getArticlesApiUrl(articleQuery: IArticleQuery): string {
  return `${ARTICLE_API_BASE_URL}/articles?keyword=${articleQuery.keyword}&country=${articleQuery.country}&category=${articleQuery.category}&timespan=${articleQuery.timespan}&num_records=${articleQuery.num_records}&domain=${articleQuery.domain}`;
}

export function mapArticleToJson(data: any) {
  return data.map((articles: any) => ({
    url: articles.url,
    title: articles.title,
    domain: articles.domain,
    seenDate: moment
      .utc(articles.seen_date, "YYYYMMDDTHHmmssZ", true)
      .format("DD MMM"),
    imgUrl: articles.img_url,
  }));
}
