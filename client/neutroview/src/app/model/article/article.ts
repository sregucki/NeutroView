export class Article {
  url: string;
  title: string;
  domain: string;
  seenDate?: Date;
  imageUrl?: string;

  constructor(
    url: string,
    title: string,
    domain: string,
    seenDate?: Date,
    imageUrl?: string
  ) {
    this.url = url;
    this.title = title;
    this.domain = domain;
    this.seenDate = seenDate;
    this.imageUrl = imageUrl;
  }
}
