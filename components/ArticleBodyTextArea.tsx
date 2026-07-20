'use client';
import { styled } from '@mui/material/styles';
import { useEffect, useRef, useState, type FC } from 'react';

import 'quill/dist/quill.snow.css';

type QuillInstance = InstanceType<Awaited<typeof import('quill')>['default']>;

interface EditorProps {
  onChange: (content: string) => void;
  value: string;
}

const EDITOR_HEIGHT = 400;

const QuillEditorWrapper = styled('div')(({ theme }) => ({
  '& .ql-toolbar.ql-snow': {
    borderColor: theme.palette.divider,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
  },
  '& .ql-container.ql-snow': {
    borderColor: theme.palette.divider,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    height: EDITOR_HEIGHT,
  },
  '& .ql-editor': {
    height: '100%',
    overflowY: 'auto',
  },
}));

const EMPTY_QUILL_HTML = '<p><br></p>';

const normalizeQuillHtml = (html: string) =>
  html === EMPTY_QUILL_HTML ? '' : html;

const setQuillHtml = (quill: QuillInstance, html: string) => {
  const nextHtml = html || '';
  if (normalizeQuillHtml(quill.root.innerHTML) === nextHtml) return;

  const selection = quill.getSelection();
  quill.root.innerHTML = nextHtml;
  if (selection) {
    quill.setSelection(selection);
  }
};

const ArticleBodyTextArea: FC<EditorProps> = ({ onChange, value }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<QuillInstance | null>(null);
  const onTextChangeRef = useRef(onChange);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    onTextChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let quill: QuillInstance;

    const init = async () => {
      const { default: Quill } = await import('quill');

      if (cancelled) return;

      const editorElement = container.appendChild(
        document.createElement('div')
      );

      quill = new Quill(editorElement, {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5] }],
            ['bold', 'italic', 'underline'],
          ],
        },
        theme: 'snow',
      });

      quillRef.current = quill;

      quill.on('text-change', () => {
        onTextChangeRef.current(normalizeQuillHtml(quill.root.innerHTML));
      });

      setIsReady(true);
    };

    void init();

    return () => {
      cancelled = true;
      quillRef.current = null;
      container.innerHTML = '';
      setIsReady(false);
    };
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill || !isReady) return;

    setQuillHtml(quill, value);
  }, [value, isReady]);

  return <QuillEditorWrapper ref={containerRef} />;
};

export default ArticleBodyTextArea;
