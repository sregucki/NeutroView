import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ArticleService } from './service/article-service/article.service';
import * as fs from 'fs';
import { Article } from './model/article/article';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  articleService: ArticleService;

  constructor(articleService: ArticleService) {
    this.articleService = articleService;
  }
  ngOnInit(): void {}

  getSampleArticles(): Article[] {
    return JSON.parse(fs.readFileSync('data/sample_news.json', 'utf8'));
  }
}
