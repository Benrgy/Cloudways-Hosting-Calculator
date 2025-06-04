
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
            className="prose prose-lg prose-emerald max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-emerald-600 hover:prose-a:text-emerald-700 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:p-4 prose-blockquote:mb-6 prose-img:rounded-lg prose-img:shadow-md prose-img:mb-6 prose-h2:mt-8 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-3"
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
    </article>
  );
};
