import { Button, TextField } from '@mui/material';
import type { FC } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import ArticleBodyTextArea from '@/components/ArticleBodyTextArea';
import { EditArticleTextInputContainer } from '@/components/EditArticleFormInputContainers';
import type { GetArticleContent } from '@/types';

const EditArticleForm: FC<{
  defaultValues: GetArticleContent;
  submitArticle: (data: GetArticleContent) => void;
}> = ({ defaultValues, submitArticle }) => {
  const { control, handleSubmit, reset } = useForm({ defaultValues });

  const title = useWatch({ control, name: 'title' });
  const body = useWatch({ control, name: 'body' });

  const onSubmit = () => {
    submitArticle({ body, title });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EditArticleTextInputContainer>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextField label="Title" fullWidth {...field} />
          )}
        />
      </EditArticleTextInputContainer>
      <EditArticleTextInputContainer>
        <Controller
          control={control}
          name="body"
          render={({ field }) => <ArticleBodyTextArea {...field} />}
        />
      </EditArticleTextInputContainer>
      <Button
        sx={{ marginRight: 1 }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Save
      </Button>
      <Button
        type="button"
        variant="contained"
        color="secondary"
        onClick={() => {
          reset(defaultValues);
        }}
      >
        Reset
      </Button>
    </form>
  );
};

export default EditArticleForm;
