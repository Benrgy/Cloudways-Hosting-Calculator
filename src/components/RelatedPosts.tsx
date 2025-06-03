
import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
  currentSlug?: string;
}

export const RelatedPosts = ({ currentSlug }: RelatedPostsProps) => {
  const relatedPosts = [
    {
      slug: "shared-hosting-vs-cloud-hosting-performance-comparison",
      title: "Shared Hosting vs Cloud Hosting: Performance Comparison 2024",
      excerpt: "Detailed performance analysis comparing shared hosting with Cloudways managed cloud hosting.",
      category: "Performance",
      readTime: "6 min read", 
      image: "/placeholder.svg",
      date: "2024-01-10"
    },
    {
      slug: "cloudways-migration-checklist-complete-guide",
      title: "Complete Cloudways Migration Checklist for 2024",
      excerpt: "Step-by-step checklist for migrating to Cloudways safely and efficiently.",
      category: "Tutorial",
      readTime: "12 min read",
      image: "/placeholder.svg", 
      date: "2024-01-05"
    },
    {
      slug: "dns-propagation-guide-website-migration",
      title: "DNS Propagation Guide for Website Migration",
      excerpt: "Everything you need to know about DNS propagation during website migration.",
      category: "Technical",
      readTime: "4 min read",
      image: "/placeholder.svg",
      date: "2024-01-03"
    }
  ].filter(post => post.slug !== currentSlug);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Related Articles
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {relatedPosts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};
