export class ArticleQuery {
  keyword?: string;
  category?: string;
  time?: string;
  numRecords?: number;
  domain?: string;
  startDate?: Date;
  endDate?: Date;
  country?: string;

  constructor(
    keyword?: string,
    category?: string,
    time?: string,
    numRecords?: number,
    domain?: string,
    startDate?: Date,
    endDate?: Date,
    country?: string
  ) {
    this.keyword = keyword;
    this.category = category;
    this.time = time;
    this.numRecords = numRecords;
    this.domain = domain;
    this.startDate = startDate;
    this.endDate = endDate;
    this.country = country;
  }
}
