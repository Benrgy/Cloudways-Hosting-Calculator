
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose prose-lg prose-emerald max-w-none"
      components={{
        img: ({ src, alt, ...props }) => (
          <img
            src={src}
            alt={alt}
            className="w-full h-auto rounded-lg shadow-lg my-6"
            loading="lazy"
            {...props}
          />
        ),
        a: ({ href, children, ...props }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 underline"
            {...props}
          >
            {children}
          </a>
        ),
        code: ({ children, ...props }) => (
          <code
            className="bg-gray-100 px-2 py-1 rounded text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        ),
        pre: ({ children, ...props }) => (
          <pre
            className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6"
            {...props}
          >
            {children}
          </pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
