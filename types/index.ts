export type AppContextType = {
  articleTypes: ReferenceDataResponseItem;
  error: Error | null;
  hasSuccessfullySaved: boolean;
  isSaving: boolean;
  setArticleTypes: (articleTypes: ReferenceDataResponseItem) => void;
  setError: (error: Error | null) => void;
  setHasSuccessfullySaved: (hasSuccessfullySaved: boolean) => void;
  setIsSaving: (isSaving: boolean) => void;
};

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

export type NormalizedApiResponse = {
  data:
    | GetArticleResponseItem
    | WriteArticleResponseItem
    | ReferenceDataResponseItem
    | null;
  error: Error | null;
};

export type ReferenceDataResponseItem = {
  key: string;
  label: string;
}[];

export type WriteArticleRequest = {
  item: GetArticleResponseItem;
};

export type WriteArticleResponseItem = GetArticleResponseItem;
