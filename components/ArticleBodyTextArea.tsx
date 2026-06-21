'use client';
import { useEffect, useRef, useState, type FC } from 'react';

import 'quill/dist/quill.snow.css';

type QuillInstance = InstanceType<Awaited<typeof import('quill')>['default']>;

interface EditorProps {
  onChange: (content: string) => void;
  value: string;
}

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
            [{ header: [1, 2, false] }],
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

  return <div ref={containerRef} className="quill-editor-wrapper" />;
};

export default ArticleBodyTextArea;
