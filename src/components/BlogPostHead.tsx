
import { Helmet } from "react-helmet-async";
import type { BlogPost } from "@/hooks/useBlogPosts";

interface BlogPostHeadProps {
  post: BlogPost;
}

export const BlogPostHead = ({ post }: BlogPostHeadProps) => {
  // Safely get the site URL
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yoursite.com';
  const fullUrl = `${siteUrl}/blog/${post.slug}`;
  
  // Fallback values with safe defaults
  const metaTitle = post.meta_title || post.title || 'Blog Post';
  const metaDescription = post.meta_description || post.excerpt || 'Read this amazing blog post';
  const ogTitle = post.og_title || metaTitle;
  const ogDescription = post.og_description || metaDescription;
  const ogImage = post.og_image || post.image_url || `${siteUrl}/og-default.jpg`;
  const twitterTitle = post.twitter_title || metaTitle;
  const twitterDescription = post.twitter_description || metaDescription;
  const twitterImage = post.twitter_image || post.image_url || ogImage;
  const siteName = "SEO Blog Platform";

  // Enhanced schema data with more comprehensive structure
  const schemaData = {
    "@context": "https://schema.org",
    "@type": post.schema_type || "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": post.image_url,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": post.author || "Anonymous"
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`,
        "width": 300,
        "height": 100
      }
    },
    "datePublished": post.published_at,
    "dateModified": post.updated_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    },
    "url": fullUrl,
    "wordCount": post.word_count,
    "keywords": post.seo_keywords?.join(", "),
    "articleSection": post.category,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "genre": post.category
  };

  return (
    <Helmet>
      {/* Essential Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={post.seo_keywords?.join(", ") || post.category || ''} />
      <meta name="author" content={post.author || 'Anonymous'} />
      
      {/* Robots and SEO Directives */}
      <meta name="robots" content={post.robots_meta || "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"} />
      <meta name="googlebot" content="index,follow" />
      <meta name="bingbot" content="index,follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={post.canonical_url || fullUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={post.title} />
      <meta property="og:locale" content="en_US" />
      <meta property="article:author" content={post.author || 'Anonymous'} />
      <meta property="article:published_time" content={post.published_at} />
      <meta property="article:modified_time" content={post.updated_at} />
      <meta property="article:section" content={post.category} />
      {post.seo_keywords?.map((keyword, index) => (
        <meta key={index} property="article:tag" content={keyword} />
      ))}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content={post.title} />
      <meta name="twitter:creator" content="@yoursite" />
      <meta name="twitter:site" content="@yoursite" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#059669" />
      <meta name="msapplication-TileColor" content="#059669" />
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      
      {/* Rich Snippets */}
      <meta name="news_keywords" content={post.seo_keywords?.join(", ") || ''} />
      <meta name="standout" content={fullUrl} />
      
      {/* Content Security and Quality */}
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
      
      {/* Breadcrumbs Schema */}
      {post.breadcrumbs && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": `${siteUrl}/blog`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": fullUrl
              }
            ]
          }, null, 2)}
        </script>
      )}
      
      {/* FAQ Schema if applicable */}
      {post.schema_type === 'FAQ' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": {
              "@type": "Question",
              "name": post.title,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": post.content?.substring(0, 500) + "..."
              }
            }
          }, null, 2)}
        </script>
      )}
    </Helmet>
  );
};
