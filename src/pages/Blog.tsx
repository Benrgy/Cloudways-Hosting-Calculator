
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { BlogHero } from "@/components/BlogHero";
import { BlogCategories } from "@/components/BlogCategories";
import { AdminQuickAccess } from "@/components/AdminQuickAccess";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const Blog = () => {
  const { data: posts, isLoading, error } = useBlogPosts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-lg">Loading blog posts...</div>
          </div>
        </div>
        <Footer />
        <AdminQuickAccess />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-red-600">
            <div className="text-lg">Error loading blog posts. Please try again later.</div>
          </div>
        </div>
        <Footer />
        <AdminQuickAccess />
      </div>
    );
  }

  const featuredPosts = posts?.filter(post => post.featured) || [];
  const recentPosts = posts?.filter(post => !post.featured) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BlogHero />
      <BlogCategories />
      
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Featured Migration Guides
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
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
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Recent Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <BlogCard key={post.id} post={{
                  slug: post.slug,
                  title: post.title,
                  excerpt: post.excerpt,
                  category: post.category,
                  readTime: post.read_time,
                  image: post.image_url,
                  date: post.published_at,
                  featured: false
                }} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No posts message */}
      {(!posts || posts.length === 0) && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No blog posts available yet
              </h2>
              <p className="text-gray-600 mb-8">
                Check back soon for helpful migration guides and hosting tips!
              </p>
              <Link to="/admin">
                <Button size="lg" className="gap-2">
                  <Plus className="w-5 h-5" />
                  Create Your First Post
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
      <AdminQuickAccess />
    </div>
  );
};

export default Blog;
