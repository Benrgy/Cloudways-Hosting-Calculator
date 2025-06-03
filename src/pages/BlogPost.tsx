
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogPostContent } from "@/components/BlogPostContent";
import { BlogPostHeader } from "@/components/BlogPostHeader";
import { RelatedPosts } from "@/components/RelatedPosts";

const BlogPost = () => {
  const { slug } = useParams();

  // In a real app, you'd fetch this data based on the slug
  const post = {
    title: "How to Migrate from Shared Hosting Without Losing SEO Rankings",
    excerpt: "A comprehensive guide to safely migrating your website from shared hosting to cloud hosting while preserving your search engine rankings and traffic.",
    content: `
      <h2>Why Migration Planning Matters for SEO</h2>
      <p>Migrating from shared hosting to cloud hosting can significantly improve your website's performance, but it requires careful planning to avoid losing your hard-earned search engine rankings.</p>
      
      <h2>Pre-Migration SEO Checklist</h2>
      <ul>
        <li>Backup your current website completely</li>
        <li>Document your current rankings for key pages</li>
        <li>Set up Google Search Console and Analytics tracking</li>
        <li>Create a comprehensive sitemap</li>
      </ul>
      
      <h2>Step-by-Step Migration Process</h2>
      <h3>1. Choose the Right Cloudways Plan</h3>
      <p>Select a plan that meets your current traffic needs with room for growth. Our calculator can help you determine the optimal plan based on your shared hosting usage.</p>
      
      <h3>2. Set Up Your New Environment</h3>
      <p>Configure your Cloudways server with the same PHP version and database settings as your current hosting.</p>
      
      <h3>3. Transfer Your Files and Database</h3>
      <p>Use staging environments to test everything before going live. This is crucial for maintaining SEO rankings.</p>
      
      <h2>Post-Migration SEO Protection</h2>
      <p>After migration, monitor your site closely for:</p>
      <ul>
        <li>404 errors and broken links</li>
        <li>Page load speed improvements</li>
        <li>Search console error reports</li>
        <li>Traffic and ranking changes</li>
      </ul>
      
      <h2>Common Migration Mistakes to Avoid</h2>
      <p>Don't make these SEO-damaging mistakes during your migration:</p>
      <ul>
        <li>Changing URL structure without proper redirects</li>
        <li>Not updating internal links</li>
        <li>Forgetting to update robots.txt and sitemap</li>
        <li>Not monitoring for broken images and assets</li>
      </ul>
    `,
    category: "Migration Guide",
    readTime: "8 min read",
    date: "2024-01-15",
    author: "Migration Expert",
    image: "/placeholder.svg"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BlogPostHeader post={post} />
      <BlogPostContent content={post.content} />
      <RelatedPosts currentSlug={slug} />
      <Footer />
    </div>
  );
};

export default BlogPost;
