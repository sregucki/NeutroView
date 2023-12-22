from nltk import pos_tag
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from typing import Counter
import newspaper


def scrap_article(url: str) -> str:
    article = newspaper.Article(url=url)
    article.download()
    article.parse()
    return article.text


def tokenize_text(article_text: str) -> list[str]:
    return word_tokenize(article_text)


def remove_stopwords(text_tokenized: list[str]) -> list[str]:
    return [
        word
        for word in text_tokenized
        if word.lower() not in stopwords.words("english")
    ]


def remove_non_nouns(text_tokenized: list[str]) -> list[str]:
    tagged_words = pos_tag(text_tokenized)
    return [word for word, pos in tagged_words if pos.startswith("NN")]


def remove_punctuation(text_tokenized: list[str]) -> list[str]:
    return [word for word in text_tokenized if word.isalnum()]


def lemmetize_text(text_tokenized: list[str]) -> list[str]:
    lemmetizer = WordNetLemmatizer()
    return [lemmetizer.lemmatize(word) for word in text_tokenized]


def sentiment_analysis(article_text: str) -> dict[str, float]:
    sia = SentimentIntensityAnalyzer()
    sia_result = sia.polarity_scores(article_text)
    sia_result.pop("compound")
    return sia_result


def text_analysis(url: str) -> dict[str, dict[str, float]]:
    article_text = scrap_article(url=url)
    text_tokenized = tokenize_text(article_text)
    text_tokenized = remove_stopwords(text_tokenized)
    text_tokenized = remove_punctuation(text_tokenized)
    text_tokenized = lemmetize_text(text_tokenized)
    text_tokenized = remove_non_nouns(text_tokenized)
    return {
        "most_common_words": dict(Counter(text_tokenized).most_common(3)),
        "sentiment": sentiment_analysis(article_text),
    }
