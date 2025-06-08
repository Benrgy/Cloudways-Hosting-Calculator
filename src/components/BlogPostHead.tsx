
import { Helmet } from "react-helmet-async";
import type { BlogPost } from "@/hooks/useBlogPosts";

interface BlogPostHeadProps {
  post: BlogPost;
}

export const BlogPostHead = ({ post }: BlogPostHeadProps) => {
  const siteUrl = window.location.origin;
  const fullUrl = `${siteUrl}/blog/${post.slug}`;
  
  const metaTitle = post.meta_title || post.title;
  const metaDescription = post.meta_description || post.excerpt;
  const ogTitle = post.og_title || metaTitle;
  const ogDescription = post.og_description || metaDescription;
  const ogImage = post.og_image || post.image_url;
  const twitterTitle = post.twitter_title || metaTitle;
  const twitterDescription = post.twitter_description || metaDescription;
  const twitterImage = post.twitter_image || post.image_url;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": post.schema_type || "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image_url,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Site Name",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
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
    "inLanguage": "en-US"
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={post.seo_keywords?.join(", ")} />
      <meta name="author" content={post.author} />
      
      {/* Robots Meta */}
      <meta name="robots" content={post.robots_meta || "index,follow"} />
      
      {/* Canonical URL */}
      {post.canonical_url && <link rel="canonical" href={post.canonical_url} />}
      {!post.canonical_url && <link rel="canonical" href={fullUrl} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Your Site Name" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:width" content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}
      <meta property="article:author" content={post.author} />
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
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#059669" />
      <meta name="msapplication-TileColor" content="#059669" />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      
      {/* Additional Schema for Breadcrumbs if enabled */}
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
          })}
        </script>
      )}
    </Helmet>
  );
};
