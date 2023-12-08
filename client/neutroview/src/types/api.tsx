export interface IArticleQuery {
  keyword?: string;
  category?: string;
  timespan?: string;
  numRecords?: number;
  domain?: string;
  startDate?: string;
  endDate?: string;
  country?: string;
}

export interface IArticle {
  url?: string;
  title?: string;
  domain?: string;
  seenDate?: string;
  imgUrl?: string;
}
