import moment from "moment";
import { ARTICLE_API_BASE_URL } from "../constants/ArticleApiConstants";
import { IArticle, IArticleQuery } from "../types/ApiTypes";

export function getArticlesApiUrl(articleQuery: IArticleQuery): string {
  const keyword = `?keyword=${articleQuery.keyword}`;
  const country = articleQuery.country ? `&country=${articleQuery.country}` : "";
  const category = articleQuery.category ? `&category=${articleQuery.category}` : "";
  const timespan = articleQuery.timespan ? `&timespan=${articleQuery.timespan}` : "";
  const num_records = articleQuery.num_records ? `&num_records=${articleQuery.num_records}` : "";
  const domain = articleQuery.domain ? `&domain=${articleQuery.domain}` : "";
  const start_date = articleQuery.start_date ? `&start_date=${articleQuery.start_date}` : "";
  const end_date = articleQuery.end_date ? `&end_date=${articleQuery.end_date}` : "";
  return `${ARTICLE_API_BASE_URL}/articles/${keyword}${country}${category}${timespan}${num_records}${domain}${start_date}${end_date}`;
}

export function getTopArticleProviders(): string {
  return "nytimes.com,bbc.co.uk,theguardian.com,foxnews.com";
}

export function mapArticleToJson(data: any): IArticle[] {
  return data.map((articles: any) => ({
    id: articles.id,
    url: articles.url,
    title: articles.title.replace(/\s+/g, " "),
    domain: articles.domain,
    seenDate: moment
      .utc(articles.seen_date, "YYYYMMDDTHHmmssZ", true)
      .format("DD MMM"),
    imgUrl: articles.img_url,
  }));
}

export async function fetchArticlesFromApi(
  query: IArticleQuery,
  dispatcher: React.Dispatch<React.SetStateAction<IArticle[]>>
): Promise<void> {
  let response;
  try {
    response = await fetch(getArticlesApiUrl(query));
    dispatcher(mapArticleToJson(await response?.json()));
  } catch (e) {
    console.error("Failed to fetch articles from api");
  }
}
