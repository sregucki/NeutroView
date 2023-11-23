from fastapi import APIRouter
from fastapi.responses import JSONResponse

from model.article_query import ArticleQuery
from service.article_service import ArticleService

router = APIRouter()


@router.get("/")
async def get_articles(query: ArticleQuery):
    articles = ArticleService(query).get_articles()
    if not articles:
        return JSONResponse(
            content={"message": "No articles found for given filters."}, status_code=404
        )
    return articles
