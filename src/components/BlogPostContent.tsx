
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
              lineHeight: '1.7'
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
          .prose p {
            margin-bottom: 1.5rem !important;
          }
          .prose h1 {
            font-size: 2.25rem !important;
            font-weight: 800 !important;
            margin-top: 2rem !important;
            margin-bottom: 1rem !important;
            line-height: 1.2 !important;
          }
          .prose h2 {
            font-size: 1.875rem !important;
            font-weight: 700 !important;
            margin-top: 2rem !important;
            margin-bottom: 1rem !important;
            line-height: 1.3 !important;
          }
          .prose h3 {
            font-size: 1.5rem !important;
            font-weight: 600 !important;
            margin-top: 1.75rem !important;
            margin-bottom: 0.875rem !important;
            line-height: 1.4 !important;
          }
          .prose h4 {
            font-size: 1.25rem !important;
            font-weight: 600 !important;
            margin-top: 1.5rem !important;
            margin-bottom: 0.75rem !important;
            line-height: 1.4 !important;
          }
          .prose h5 {
            font-size: 1.125rem !important;
            font-weight: 600 !important;
            margin-top: 1.25rem !important;
            margin-bottom: 0.625rem !important;
            line-height: 1.5 !important;
          }
          .prose h6 {
            font-size: 1rem !important;
            font-weight: 600 !important;
            margin-top: 1rem !important;
            margin-bottom: 0.5rem !important;
            line-height: 1.5 !important;
          }
          .prose h1:first-child, 
          .prose h2:first-child, 
          .prose h3:first-child,
          .prose h4:first-child,
          .prose h5:first-child,
          .prose h6:first-child {
            margin-top: 0 !important;
          }
          .prose blockquote {
            margin-top: 1.5rem !important;
            margin-bottom: 1.5rem !important;
          }
          .prose ul, .prose ol {
            margin-top: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
          .prose img {
            margin-top: 1.5rem !important;
            margin-bottom: 1.5rem !important;
          }
        `
      }} />
    </article>
  );
};
