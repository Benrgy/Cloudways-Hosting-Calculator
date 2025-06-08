
import { useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogPostContent } from "@/components/BlogPostContent";
import { BlogPostHeader } from "@/components/BlogPostHeader";
import { BlogPostHead } from "@/components/BlogPostHead";
import { RelatedPosts } from "@/components/RelatedPosts";
import { useBlogPost } from "@/hooks/useBlogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const { data: post, isLoading, error } = useBlogPost(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-lg">Loading blog post...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <a href="/blog" className="text-emerald-600 hover:text-emerald-700 underline">
              Back to Blog
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const postData = {
    title: post.title,
    category: post.category,
    readTime: post.read_time,
    date: post.published_at,
    author: post.author,
    image: post.image_url
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-50">
        <BlogPostHead post={post} />
        <Header />
        {post.breadcrumbs && (
          <nav className="bg-white border-b">
            <div className="container mx-auto px-4 py-3">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li><a href="/" className="hover:text-emerald-600">Home</a></li>
                <li className="before:content-['/'] before:mx-2">
                  <a href="/blog" className="hover:text-emerald-600">Blog</a>
                </li>
                <li className="before:content-['/'] before:mx-2 text-gray-900">
                  {post.title}
                </li>
              </ol>
            </div>
          </nav>
        )}
        <BlogPostHeader post={postData} />
        <BlogPostContent content={post.content} />
        <RelatedPosts currentSlug={slug} />
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default BlogPost;
