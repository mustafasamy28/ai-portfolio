/* eslint-disable react/prop-types */
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { Link } from 'react-router-dom';

const MarkdownRenderer = ({ content }) => {
  // Transform custom link format (path)[page] to proper markdown links
  const processCustomLinks = text => {
    // Regex to match pattern: (path)[page]
    const customLinkRegex = /\(([^)]+)\)\[page\]/g;

    return text.replace(customLinkRegex, (match, path) => {
      // Convert to markdown link format with internal path for React Router
      return `[${path}](${path})`;
    });
  };

  const processedContent = processCustomLinks(content);
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-primary1 mb-3 mt-4 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-semibold text-primary2 mb-2 mt-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold text-primary3 mb-2 mt-2">
              {children}
            </h3>
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className="text-gray-200 mb-3 leading-relaxed">{children}</p>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-gray-200 mb-3 space-y-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-gray-200 mb-3 space-y-1">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-200 leading-relaxed">{children}</li>
          ),

          // Code blocks
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline ? (
              <div className="relative">
                <pre className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 overflow-x-auto border border-primary4/30 my-4">
                  <code
                    className={`language-${match?.[1] || 'text'} text-sm`}
                    {...props}
                  >
                    {children}
                  </code>
                </pre>
                {match && (
                  <span className="absolute top-2 right-2 text-xs text-gray-400 bg-gray-700/80 px-2 py-1 rounded">
                    {match[1]}
                  </span>
                )}
              </div>
            ) : (
              <code className="bg-gray-700/60 text-primary1 px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          },

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary3 pl-4 my-4 italic text-gray-300">
              {children}
            </blockquote>
          ),

          // Links
          a: ({ href, children }) => {
            // Check if it's an internal route (starts with /)
            const isInternalLink = href && href.startsWith('/');

            if (isInternalLink) {
              // Use React Router Link for internal navigation
              return (
                <Link
                  to={href}
                  className="text-primary1 hover:text-primary2 underline underline-offset-2 decoration-primary1/60 hover:decoration-primary2 transition-all duration-200 font-medium cursor-pointer"
                >
                  {children}
                </Link>
              );
            }

            // Use regular anchor tag for external links
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary1 hover:text-primary2 underline underline-offset-2 decoration-primary1/60 hover:decoration-primary2 transition-all duration-200 font-medium"
              >
                {children}
              </a>
            );
          },

          // Strong/Bold
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),

          // Emphasis/Italic
          em: ({ children }) => (
            <em className="italic text-gray-300">{children}</em>
          ),

          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse border border-gray-600">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-600 bg-gray-800/80 px-3 py-2 text-left text-primary1 font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-600 px-3 py-2 text-gray-200">
              {children}
            </td>
          ),

          // Horizontal rule
          hr: () => <hr className="my-6 border-t border-primary4/30" />,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
