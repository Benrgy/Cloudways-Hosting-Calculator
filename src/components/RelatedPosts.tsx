
import { BlogCard } from "./BlogCard";
import { useBlogPosts } from "@/hooks/useBlogPosts";

interface RelatedPostsProps {
  currentSlug?: string;
}

export const RelatedPosts = ({ currentSlug }: RelatedPostsProps) => {
  const { data: posts } = useBlogPosts();

  const relatedPosts = posts?.filter(post => post.slug !== currentSlug).slice(0, 3) || [];

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Related Articles
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {relatedPosts.map((post) => (
            <BlogCard key={post.id} post={{
              slug: post.slug,
              title: post.title,
              excerpt: post.excerpt,
              category: post.category,
              readTime: post.read_time,
              image: post.image_url,
              date: post.published_at,
              featured: post.featured
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};
