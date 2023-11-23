import logging
from dataclasses import dataclass
from re import X
from typing import Union

from gdeltdoc import GdeltDoc, Filters
from pandas import DataFrame

from model.article import Article
from model.article_query import ArticleQuery


@dataclass
class ArticleService:
    query: ArticleQuery

    def get_filters(self) -> Filters:
        return Filters(
            keyword=self.query.keyword,
            timespan=self.query.timespan,
            start_date=str(self.query.start_date) if self.query.start_date else None,
            end_date=str(self.query.end_date) if self.query.end_date else None,
            num_records=self.query.num_records if self.query.num_records else 0,
            domain=self.query.domain,
            country=self.query.country,
        )

    def get_articles_gdelt(self) -> DataFrame:
        try:
            return GdeltDoc().article_search(filters=self.get_filters())
        except ValueError as e:
            logging.getLogger().warning(
                "--- WARN ---\n"
                "Error while getting articles from GDELT.\n"
                "No articles found for given filters.\n"
                "Error message: " + str(e) + "\n--- WARN ---"
            )
            return DataFrame()

    def get_articles(self) -> Union[list[Article], None]:
        articles = self.get_articles_gdelt()
        if not articles.empty:
            return [
                Article(
                    url=row["url"],
                    title=row["title"],
                    seen_date=row["seendate"],
                    img_url=row["socialimage"],
                    domain=row["domain"],
                )
                for index, row in self.get_articles_gdelt().iterrows()
            ]
        else:
            return None
