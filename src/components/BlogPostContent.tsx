
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
            className="prose prose-lg prose-emerald max-w-none"
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
