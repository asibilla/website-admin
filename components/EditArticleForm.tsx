import { Button, FormHelperText, TextField } from '@mui/material';
import type { FC } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import ArticleBodyTextArea from '@/components/ArticleBodyTextArea';
import { EditArticleTextInputContainer } from '@/components/EditArticleFormInputContainers';
import type { GetArticleContent, WriteArticleContent } from '@/types';

const EditArticleForm: FC<{
  defaultValues: GetArticleContent;
  disabled: boolean;
  submitArticle: (data: WriteArticleContent) => void;
}> = ({ defaultValues, disabled, submitArticle }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

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
            <TextField
              error={!!errors.title}
              helperText={errors.title?.message}
              label="Title"
              fullWidth
              {...field}
            />
          )}
          rules={{ required: 'Title is required' }}
        />
      </EditArticleTextInputContainer>
      <EditArticleTextInputContainer>
        <Controller
          control={control}
          name="body"
          render={({ field }) => (
            <>
              <ArticleBodyTextArea {...field} />
              {errors.body?.message && (
                <FormHelperText error sx={{ marginLeft: '14px' }}>
                  {errors.body.message}
                </FormHelperText>
              )}
            </>
          )}
          rules={{ required: 'Body is required' }}
        />
      </EditArticleTextInputContainer>
      <Button
        color="primary"
        disabled={disabled}
        sx={{ marginRight: 1 }}
        type="submit"
        variant="contained"
      >
        Save
      </Button>
      <Button
        color="secondary"
        disabled={disabled}
        onClick={() => {
          reset(defaultValues);
        }}
        type="button"
        variant="contained"
      >
        Reset
      </Button>
    </form>
  );
};

export default EditArticleForm;
