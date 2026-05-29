import { API_URL, GET_ARTICLE_PATH } from '@/constants';
import type {
  GetArticleContentItem,
  GetArticleParams,
  GetArticleResponse,
  GetArticleError,
  GetArticleErrorResponse,
} from '@/types';

const createQueryString = (params: GetArticleParams) => {
  const { id = '', type = '' } = params;
  if (!id && !type) {
    return '';
  }
  let queryString = '?';
  if (id) {
    queryString += `id=${id}`;
  }
  if (type) {
    queryString += id ? `&type=${type}` : `type=${type}`;
  }
  return queryString;
};

export const getArticle = async (
  params: GetArticleParams
): Promise<GetArticleContentItem[] | GetArticleError> => {
  const { id = '', type = '' } = params;
  try {
    const response = await fetch(
      `${API_URL}${GET_ARTICLE_PATH}${createQueryString({ id, type })}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }

    const data: GetArticleResponse | GetArticleErrorResponse =
      await response.json();
    if ('error' in data || !('response' in data)) {
      throw data.error ?? new Error('Failed to fetch article');
    }
    return data.response.map(({ 'article-id': articleId, content }) => ({
      articleId,
      body: content?.body ?? '',
      title: content?.title ?? '',
    })) as GetArticleContentItem[];
  } catch (error) {
    return {
      message: 'Failed to fetch article',
      raw: error as Error,
    };
  }
};
