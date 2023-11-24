import { Injectable, OnInit } from '@angular/core';
import { ArticleQuery } from '../../model/article_query/article-query';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Article } from '../../model/article/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private httpClient: HttpClient) {}

  public getArticles(query: ArticleQuery): Observable<any> {
    return this.httpClient.get<Article[]>(
      `http://localhost:8000/articles/?${this.getQueryParams(query)}`
    );
  }

  private getQueryParams(query: ArticleQuery): string {
    return `${query.keyword ? `keyword=${query.keyword}` : ''}${
      query.category ? `&category=${query.category}` : ''
    }${query.timespan ? `&timespan=${query.timespan}` : ''}${
      query.numRecords ? `&numRecords=${query.numRecords}` : ''
    }${query.domain ? `&domain=${query.domain}` : ''}${
      query.startDate ? `&startDate=${query.startDate}` : ''
    }${query.endDate ? `&endDate=${query.endDate}` : ''}${
      query.country ? `&country=${query.country}` : ''
    }
    `;
  }
}
