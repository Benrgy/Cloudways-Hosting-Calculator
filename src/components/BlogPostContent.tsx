
interface BlogPostContentProps {
  content: string;
}

export const BlogPostContent = ({ content }: BlogPostContentProps) => {
  const handleCalculateClick = () => {
    window.open('https://www.cloudways.com/en/?id=1384181', '_blank');
  };

  return (
    <article className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg prose-emerald max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-emerald-600 hover:prose-a:text-emerald-700 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:p-4 prose-img:rounded-lg prose-img:shadow-md"
            style={{
              lineHeight: '1.8',
              fontSize: '18px'
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          
          {/* Call to Action */}
          <div className="mt-12 p-8 bg-emerald-50 rounded-lg border border-emerald-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Calculate Your Migration Savings?
            </h3>
            <p className="text-gray-600 mb-6">
              Use our free calculator to see how much you could save by migrating 
              from shared hosting to Cloudways managed cloud hosting.
            </p>
            <button 
              onClick={handleCalculateClick}
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
            >
              Get Started with Cloudways
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .prose {
            color: #374151;
            max-width: none;
          }
          .prose p {
            margin-bottom: 1.75rem !important;
            line-height: 1.8 !important;
            font-size: 18px !important;
            color: #4b5563 !important;
          }
          .prose h1 {
            font-size: 2.5rem !important;
            font-weight: 800 !important;
            margin-top: 3rem !important;
            margin-bottom: 1.5rem !important;
            line-height: 1.2 !important;
            color: #111827 !important;
          }
          .prose h2 {
            font-size: 2rem !important;
            font-weight: 700 !important;
            margin-top: 3rem !important;
            margin-bottom: 1.25rem !important;
            line-height: 1.3 !important;
            color: #111827 !important;
            border-bottom: 2px solid #e5e7eb !important;
            padding-bottom: 0.5rem !important;
          }
          .prose h3 {
            font-size: 1.5rem !important;
            font-weight: 600 !important;
            margin-top: 2.5rem !important;
            margin-bottom: 1rem !important;
            line-height: 1.4 !important;
            color: #111827 !important;
          }
          .prose h4 {
            font-size: 1.25rem !important;
            font-weight: 600 !important;
            margin-top: 2rem !important;
            margin-bottom: 0.75rem !important;
            line-height: 1.4 !important;
            color: #111827 !important;
          }
          .prose h5 {
            font-size: 1.125rem !important;
            font-weight: 600 !important;
            margin-top: 1.75rem !important;
            margin-bottom: 0.625rem !important;
            line-height: 1.5 !important;
            color: #111827 !important;
          }
          .prose h6 {
            font-size: 1rem !important;
            font-weight: 600 !important;
            margin-top: 1.5rem !important;
            margin-bottom: 0.5rem !important;
            line-height: 1.5 !important;
            color: #111827 !important;
          }
          .prose h1:first-child, 
          .prose h2:first-child, 
          .prose h3:first-child,
          .prose h4:first-child,
          .prose h5:first-child,
          .prose h6:first-child {
            margin-top: 0 !important;
          }
          .prose ul, .prose ol {
            margin-top: 1.5rem !important;
            margin-bottom: 2rem !important;
            padding-left: 1.5rem !important;
          }
          .prose li {
            margin-bottom: 0.75rem !important;
            line-height: 1.7 !important;
            font-size: 18px !important;
          }
          .prose li::marker {
            color: #059669 !important;
          }
          .prose blockquote {
            margin-top: 2rem !important;
            margin-bottom: 2rem !important;
            padding: 1.5rem !important;
            background-color: #f0fdf4 !important;
            border-left: 4px solid #059669 !important;
            font-style: italic !important;
          }
          .prose strong {
            font-weight: 700 !important;
            color: #111827 !important;
          }
          .prose code {
            background-color: #f3f4f6 !important;
            padding: 0.25rem 0.5rem !important;
            border-radius: 0.375rem !important;
            font-size: 0.875rem !important;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
          }
          .prose pre {
            background-color: #1f2937 !important;
            color: #f9fafb !important;
            padding: 1.5rem !important;
            border-radius: 0.5rem !important;
            margin: 2rem 0 !important;
            overflow-x: auto !important;
          }
          .prose pre code {
            background-color: transparent !important;
            color: inherit !important;
            padding: 0 !important;
          }
          .prose img {
            margin: 2rem 0 !important;
            border-radius: 0.5rem !important;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
          }
          .prose hr {
            margin: 3rem 0 !important;
            border-color: #e5e7eb !important;
          }
          .prose a {
            color: #059669 !important;
            text-decoration: underline !important;
            font-weight: 500 !important;
          }
          .prose a:hover {
            color: #047857 !important;
          }
          /* Emoji and special characters styling */
          .prose p:has(✅), .prose p:has(🔍), .prose p:has(📁), .prose p:has(💾), .prose p:has(📧), .prose p:has(🛠️), .prose p:has(🔗), .prose p:has(👉), .prose p:has(💡), .prose p:has(🕒), .prose p:has(🔐), .prose p:has(🔄), .prose p:has(📤), .prose p:has(🧩), .prose p:has(⚡) {
            margin-bottom: 1rem !important;
          }
        `
      }} />
    </article>
  );
};
