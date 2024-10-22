import React from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

import 'highlight.js/styles/github.css';

interface IMarkdownCodeProps {
  code: string;
  className?: string;
}

export const MarkdownCode = ({ code, className }: IMarkdownCodeProps) => {
  return (
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
      className={className}
    >
      {code}
    </Markdown>
  );
};
