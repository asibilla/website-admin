import { TextField } from '@mui/material';
import type { FC } from 'react';

import ArticleBodyTextArea from '@/components/ArticleBodyTextArea';
import { EditArticleTextInputContainer } from '@/components/EditArticleFormInputContainers';

const EditArticleForm: FC = () => {
  const onArticleBodyChange = (body: string) => {
    console.log(body);
  };

  return (
    <form>
      <EditArticleTextInputContainer>
        <TextField label="Title" name="title" fullWidth />
      </EditArticleTextInputContainer>
      <EditArticleTextInputContainer>
        <ArticleBodyTextArea onChange={onArticleBodyChange} value={''} />
      </EditArticleTextInputContainer>
    </form>
  );
};

export default EditArticleForm;
