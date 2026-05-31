'use client';
import { useEffect, useRef, type FC } from 'react';

import 'quill/dist/quill.snow.css';

interface EditorProps {
  onChange: (content: string) => void;
  value: string;
}

const ArticleBodyTextArea: FC<EditorProps> = ({ onChange, value }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<InstanceType<
    Awaited<typeof import('quill')>['default']
  > | null>(null);

  const onTextChangeRef = useRef(onChange);

  useEffect(() => {
    onTextChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let quill: InstanceType<Awaited<typeof import('quill')>['default']>;

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

      if (value) {
        quill.root.innerHTML = value;
      }

      quill.on('text-change', () => {
        onTextChangeRef.current(quill.root.innerHTML);
      });
    };

    void init();

    return () => {
      cancelled = true;
      quillRef.current = null;
      container.innerHTML = '';
    };
    // Quill is initialized once; `value` is only applied on first mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional
  }, []);

  return <div ref={containerRef} className="quill-editor-wrapper" />;
};

export default ArticleBodyTextArea;
