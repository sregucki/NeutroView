from datetime import date
from typing import Optional
from fastapi import APIRouter
from fastapi.responses import JSONResponse

from model.article_query import ArticleQuery
from service.article_service import ArticleService

router = APIRouter()


@router.get("/")
async def get_articles(
    keyword: Optional[str] = None,
    category: Optional[str] = "politics",
    timespan: Optional[str] = "1d",
    num_records: Optional[int] = 10,
    domain: Optional[str] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    country: Optional[str] = None,
):
    articles = ArticleService(
        ArticleQuery(
            keyword=keyword,
            category=category,
            timespan=timespan,
            num_records=num_records,
            domain=domain,
            start_date=start_date,
            end_date=end_date,
            country=country,
        )
    ).get_articles()
    if not articles:
        return JSONResponse(
            content={"message": "No articles found for given filters."}, status_code=404
        )
    return articles
