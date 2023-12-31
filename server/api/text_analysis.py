from fastapi import APIRouter
from service.text_analysis_service import text_analysis

router = APIRouter()


@router.get("/")
async def get_analysis(
    article_url: str,
) -> dict[str, dict[str, float]]:
    return text_analysis(
        url=article_url,
    )
