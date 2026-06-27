export type AppContextType = {
  articleTypes: ReferenceDataResponseItem[];
  error: Error | null;
  hasSuccessfullySaved: boolean;
  isSaving: boolean;
  setArticleTypes: (articleTypes: ReferenceDataResponseItem[]) => void;
  setError: (error: Error | null) => void;
  setHasSuccessfullySaved: (hasSuccessfullySaved: boolean) => void;
  setIsSaving: (isSaving: boolean) => void;
};

export type DeleteArticleRequest = {
  key: UpdateKeys;
};

export type GetArticleParams = {
  id?: string;
  type?: string;
};

export type GetArticleContentItem = {
  articleId: string;
  body: string;
  title: string;
};

export type GetArticleContent = Pick<GetArticleContentItem, 'title' | 'body'>;

export type GetArticleResponseItem = {
  'article-id': string;
  'article-type': string;
  content: GetArticleContent;
};

export type GetArticleResponse = {
  response: {
    items: GetArticleResponseItem[];
  };
};

export type NormalizedApiResponse = {
  data:
    | GetArticleContentItem[]
    | WriteArticleResponseItem
    | ReferenceDataResponseItem[]
    | null;
  error: Error | null;
};

export type PatchArticleRequest = {
  key: UpdateKeys;
  updates: {
    content: GetArticleContent;
  };
};

export type PutArticleRequest = {
  item: WriteArticleResponseItem;
};

export type ReferenceDataResponseItem = {
  key: string;
  label: string;
};

export type UpdateKeys = {
  'article-id': string;
  'article-type': string;
};

export type WriteArticleContent = GetArticleContent;
export type WriteArticleResponseItem = GetArticleResponseItem;
