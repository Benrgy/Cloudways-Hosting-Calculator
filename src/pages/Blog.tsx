
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { BlogHero } from "@/components/BlogHero";
import { BlogCategories } from "@/components/BlogCategories";

const Blog = () => {
  const featuredPosts = [
    {
      slug: "migrate-shared-hosting-without-losing-seo-rankings",
      title: "How to Migrate from Shared Hosting Without Losing SEO Rankings",
      excerpt: "A comprehensive guide to safely migrating your website from shared hosting to cloud hosting while preserving your search engine rankings and traffic.",
      category: "Migration Guide",
      readTime: "8 min read",
      image: "/placeholder.svg",
      date: "2024-01-15",
      featured: true
    },
    {
      slug: "shared-hosting-vs-cloud-hosting-performance-comparison",
      title: "Shared Hosting vs Cloud Hosting: Performance Comparison 2024",
      excerpt: "Detailed performance analysis comparing shared hosting with Cloudways managed cloud hosting, including speed tests and uptime statistics.",
      category: "Performance",
      readTime: "6 min read", 
      image: "/placeholder.svg",
      date: "2024-01-10",
      featured: true
    },
    {
      slug: "cloudways-migration-checklist-complete-guide",
      title: "Complete Cloudways Migration Checklist for 2024",
      excerpt: "Step-by-step checklist for migrating to Cloudways, including pre-migration preparation, DNS changes, and post-migration optimization.",
      category: "Tutorial",
      readTime: "12 min read",
      image: "/placeholder.svg", 
      date: "2024-01-05",
      featured: true
    }
  ];

  const recentPosts = [
    {
      slug: "why-shared-hosting-slows-down-your-website",
      title: "Why Shared Hosting Slows Down Your Website (And What to Do About It)",
      excerpt: "Understanding the technical limitations of shared hosting and how they impact your website's performance and user experience.",
      category: "Performance",
      readTime: "5 min read",
      image: "/placeholder.svg",
      date: "2024-01-12"
    },
    {
      slug: "cloudways-pricing-vs-shared-hosting-cost-analysis",
      title: "Cloudways Pricing vs Shared Hosting: True Cost Analysis",
      excerpt: "Break down the real costs of shared hosting vs Cloudways, including hidden fees and performance value analysis.",
      category: "Cost Analysis", 
      readTime: "7 min read",
      image: "/placeholder.svg",
      date: "2024-01-08"
    },
    {
      slug: "dns-propagation-guide-website-migration",
      title: "DNS Propagation Guide for Website Migration",
      excerpt: "Everything you need to know about DNS propagation during website migration to avoid downtime and traffic loss.",
      category: "Technical",
      readTime: "4 min read",
      image: "/placeholder.svg",
      date: "2024-01-03"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BlogHero />
      <BlogCategories />
      
      {/* Featured Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Featured Migration Guides
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Recent Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
