'use client';

import {
  Button,
  CircularProgress,
  FormHelperText,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import type { ChangeEvent, FC } from 'react';
import { useContext, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { uploadImage } from '@/api';
import ArticleBodyTextArea from '@/components/ArticleBodyTextArea';
import { AppContext } from '@/components/AppContext';
import { EditArticleTextInputContainer } from '@/components/EditArticleFormInputContainers';
import type { GetArticleContent, WriteArticleContent } from '@/types';

const StyledButtonWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  width: '100%',
}));

const ImagePreview = styled('img')(({ theme }) => ({
  display: 'block',
  marginTop: theme.spacing(1),
  maxHeight: 200,
  maxWidth: '100%',
}));

const ImageUploadControls = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

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
    setValue,
  } = useForm({ defaultValues });

  const router = useRouter();
  const { setError } = useContext(AppContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const title = useWatch({ control, name: 'title' });
  const body = useWatch({ control, name: 'body' });
  const subtitle = useWatch({ control, name: 'subtitle' });
  const imageUrl = useWatch({ control, name: 'imageUrl' });

  const onSubmit = () => {
    submitArticle({ body, imageUrl, subtitle, title });
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    setIsUploading(true);
    setError(null);

    const { data, error } = await uploadImage(file);

    setIsUploading(false);

    if (error || !data?.url) {
      setError(error ?? new Error('Failed to upload image'));
      return;
    }

    setValue('imageUrl', data.url, { shouldDirty: true });
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
          name="subtitle"
          render={({ field }) => (
            <TextField label="Subtitle" fullWidth {...field} />
          )}
        />
      </EditArticleTextInputContainer>
      <EditArticleTextInputContainer>
        <Controller
          control={control}
          name="imageUrl"
          render={() => (
            <>
              <input
                ref={fileInputRef}
                accept="image/*"
                hidden
                onChange={handleFileChange}
                type="file"
              />
              <ImageUploadControls>
                <Button
                  disabled={disabled || isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                  variant="outlined"
                >
                  Upload image
                </Button>
                {isUploading ? <CircularProgress size={24} /> : null}
              </ImageUploadControls>
              {imageUrl ? (
                <ImagePreview alt="Article image preview" src={imageUrl} />
              ) : null}
            </>
          )}
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

      <StyledButtonWrapper>
        <Button
          color="primary"
          disabled={disabled}
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
        <Button
          color="secondary"
          onClick={() => {
            router.back();
          }}
          sx={{ marginLeft: 'auto' }}
          type="button"
          variant="contained"
        >
          Cancel
        </Button>
      </StyledButtonWrapper>
    </form>
  );
};

export default EditArticleForm;
