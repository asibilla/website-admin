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
