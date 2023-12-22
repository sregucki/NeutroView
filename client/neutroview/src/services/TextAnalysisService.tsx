import { ARTICLE_API_BASE_URL } from "../constants/ArticleApiConstants";
import { ITextAnalysis } from "../types/ApiTypes";

function getTextAnalysisApiUrl(article_url: string): string {
  return `${ARTICLE_API_BASE_URL}/text_analysis?article_url=${article_url}`;
}

function mapTextAnalysisToJson(data: any): ITextAnalysis {
  const text_analysis = {
    most_common_words: data.most_common_words,
    sentiment: data.sentiment,
  };
  console.log(text_analysis);
  return text_analysis;
}

export async function fetchTextAnalysisFromApi(
  article_url: string,
  dispatcher: React.Dispatch<React.SetStateAction<any>>
): Promise<void> {
  let response;
  try {
    response = await fetch(getTextAnalysisApiUrl(article_url));
    dispatcher(mapTextAnalysisToJson(await response?.json()));
  } catch (e) {
    console.error("Failed to fetch article text analysis from api");
  }
}
