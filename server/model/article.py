from dataclasses import dataclass
from typing import Optional


@dataclass
class Article:
    url: str
    title: str
    domain: str
    id: Optional[str] = None
    seen_date: Optional[str] = None
    img_url: Optional[str] = None
