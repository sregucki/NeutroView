import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import articles

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"])
app.include_router(articles.router, prefix="/articles", tags=["articles"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, log_level="info", reload=True)
