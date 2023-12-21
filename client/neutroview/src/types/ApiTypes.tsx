export interface IArticleQuery {
  keyword?: string;
  category?: string;
  timespan?: string;
  num_records?: number;
  domain?: string;
  start_date?: string;
  end_date?: string;
  country?: string;
}

export interface IArticle {
  id: string;
  url?: string;
  title?: string;
  domain?: string;
  seenDate?: string;
  imgUrl?: string;
  keywords?: string[];
}
