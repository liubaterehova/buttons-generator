import React from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import classnames from 'classnames';

import 'highlight.js/styles/github.css';

interface IMarkdownCodeProps {
  code: string;
  className?: string;
}

export const MarkdownCode = ({ code, className }: IMarkdownCodeProps) => {
  return (
    <div className={classnames('min-w-0', className)}>
      <Markdown
        rehypePlugins={[
          [
            rehypeHighlight,
            {
              detect: true,
              ignoreMissing: true,
            },
          ],
        ]}
      >
        {code}
      </Markdown>
    </div>
  );
};
