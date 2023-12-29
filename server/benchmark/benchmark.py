from benchmark.calc_time import calc_time
from model.article_query import ArticleQuery
from service.article_service import ArticleService


@calc_time
def estimate(**params):
    article_service = ArticleService(
        query=ArticleQuery(
            keyword=params.get("keyword"),
            timespan=params.get("timespan"),
            num_records=params.get("num_records"),
            domain=params.get("domain"),
            start_date=params.get("start_date"),
            end_date=params.get("end_date"),
            country=params.get("country"),
        )
    )
    article_service.get_articles()
    
