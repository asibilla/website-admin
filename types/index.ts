export type GetArticleParams = {
  id?: string;
  type?: string;
};

export type GetArticleError = {
  message: string;
  raw: Error;
};

export type GetArticleContentItem = {
  articleId: string;
  body: string;
  title: string;
};

export type GetArticleContent = Pick<GetArticleContentItem, 'title' | 'body'>;
export type WriteArticleContent = GetArticleContent;

export type GetArticleErrorResponse = {
  error: Error;
};

export type GetArticleResponseItem = {
  'article-id': string;
  'article-type': string;
  content: {
    body: string;
    title: string;
  };
};

export type GetArticleResponse = {
  response: GetArticleResponseItem[];
};

export type WriteArticleRequest = {
  item: GetArticleResponseItem;
};

export type WriteArticleResponse = GetArticleResponseItem;

export type NormalizedApiResponse = {
  data: GetArticleResponseItem | WriteArticleResponse | null;
  error: Error | null;
};
