
export const BlogHero = () => {
  return (
    <section className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Migration & Hosting Insights
        </h1>
        <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
          Expert guides, tutorials, and insights to help you migrate from shared hosting 
          without losing traffic, rankings, or revenue. Stay updated with the latest 
          hosting trends and best practices.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-emerald-100">
          <span className="bg-emerald-400/20 px-4 py-2 rounded-full">
            Migration Guides
          </span>
          <span className="bg-emerald-400/20 px-4 py-2 rounded-full">
            Performance Tips
          </span>
          <span className="bg-emerald-400/20 px-4 py-2 rounded-full">
            SEO Protection
          </span>
          <span className="bg-emerald-400/20 px-4 py-2 rounded-full">
            Cost Analysis
          </span>
        </div>
      </div>
    </section>
  );
};
