import {
  API_URL,
  ASSETS_URL,
  GET_ARTICLE_PATH,
  GET_REFERENCE_DATA_PATH,
} from '@/constants';
import type {
  GetArticleParams,
  GetArticleResponse,
  NormalizedApiResponse,
  ReferenceDataResponseItem,
  WriteArticleContent,
  WriteArticleResponseItem,
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
): Promise<NormalizedApiResponse> => {
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

    const data: GetArticleResponse = await response.json();
    if ('error' in data || !('response' in data)) {
      throw data.error ?? new Error('Failed to fetch article');
    }
    return {
      data: data.response.items.map(
        ({
          'article-id': articleId,
          'article-type': articleType,
          content,
          date,
        }) => ({
          articleId,
          articleType,
          body: content?.body ?? '',
          date,
          imageUrl: content?.imageUrl ?? '',
          subtitle: content?.subtitle ?? '',
          title: content?.title ?? '',
        })
      ),
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
    };
  }
};

export const writeArticle = async ({
  articleType,
  data,
  id,
  method,
}: {
  articleType: string;
  data: WriteArticleContent;
  id: string;
  method: 'DELETE' | 'PUT' | 'PATCH';
}): Promise<NormalizedApiResponse> => {
  try {
    const response: Response = await fetch(`/api/write-article`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'article-id': id,
        'article-type': articleType,
        date: new Date().toISOString(),
        content: {
          body: data.body,
          imageUrl: data.imageUrl ?? '',
          subtitle: data.subtitle,
          title: data.title,
        },
      }),
    });

    if (!response.ok || response.status > 299) {
      throw new Error('Failed to write article');
    }

    const responseData: WriteArticleResponseItem = await response.json();

    return {
      data: responseData,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
    };
  }
};

export const uploadImage = async (
  file: File
): Promise<{ data: { url: string } | null; error: Error | null }> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data: { url: string } = await response.json();

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
    };
  }
};

export const getReferenceData = async (): Promise<NormalizedApiResponse> => {
  try {
    const response: Response = await fetch(
      `${ASSETS_URL}${GET_REFERENCE_DATA_PATH}/articleTypes.json`
    );
    const data: ReferenceDataResponseItem[] = await response.json();
    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
    };
  }
};
