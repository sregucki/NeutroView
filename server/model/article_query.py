from dataclasses import dataclass
from datetime import date
from typing import Optional


@dataclass
class ArticleQuery:
    keyword: Optional[str] = None
    category: Optional[str] = "politics"
    timespan: Optional[str] = "1d"
    num_records: Optional[int] = 10
    domain: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    country: Optional[str] = None
