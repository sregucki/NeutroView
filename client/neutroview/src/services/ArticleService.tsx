import moment from "moment";
import { ARTICLE_API_BASE_URL } from "../constants/ArticleApiConstants";
import { IArticle, IArticleQuery } from "../types/ApiTypes";

export function getArticlesApiUrl(articleQuery: IArticleQuery): string {
  return `${ARTICLE_API_BASE_URL}/articles?keyword=${articleQuery.keyword}&country=${articleQuery.country}&category=${articleQuery.category}&timespan=${articleQuery.timespan}&num_records=${articleQuery.num_records}&domain=${articleQuery.domain}`;
}

export function getTopArticleProviders(): string {
  return "nytimes.com,bbc.co.uk,theguardian.com,cnn.com,foxnews.com";
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
