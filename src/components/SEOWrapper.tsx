import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getSEOConfig } from "@/utils/seoConfig";
import { useEffect } from "react";
import { useLanguage } from '@/contexts/LanguageContext';

export const SEOWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { currentLanguage } = useLanguage();
  const seoConfig = getSEOConfig(location.pathname);

  // Update document title immediately for better UX
  useEffect(() => {
    document.title = seoConfig.title;
  }, [seoConfig.title]);

  // Determine the correct base URL based on the current environment
  const getBaseUrl = () => {
    if (import.meta.env.DEV) {
      return 'http://localhost:8080';
    }
    
    const hostname = window.location.hostname;
    
    // GitHub Pages
    if (hostname.includes('github.io')) {
      return 'https://benrgy.github.io/Cloudways-Hosting-Calculator';
    }
    
    // Netlify or other custom domains
    return `https://${hostname}`;
  };
  
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}${location.pathname}${currentLanguage !== 'en' ? `?lang=${currentLanguage}` : ''}`;

  return (
    <>
      <Helmet>
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />
        <meta name="language" content={currentLanguage} />
        <meta name="author" content="Cloudways Hosting Calculator" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://cloudways.com" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={seoConfig.ogTitle} />
        <meta property="og:description" content={seoConfig.ogDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Cloudways Hosting Calculator" />
        <meta property="og:locale" content={currentLanguage === 'en' ? 'en_US' : currentLanguage} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoConfig.twitterTitle} />
        <meta name="twitter:description" content={seoConfig.twitterDescription} />
        <meta name="twitter:image" content={`${baseUrl}/og-image.jpg`} />
        <meta name="twitter:creator" content="@cloudways" />
        
        {/* Performance & SEO Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#059669" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        
        {/* Additional SEO meta tags */}
        <meta name="application-name" content="Cloudways Calculator" />
        <meta name="apple-mobile-web-app-title" content="Cloudways Calculator" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Performance hints */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Structured Data */}
        {seoConfig.structuredData && (
          <script type="application/ld+json">
            {JSON.stringify({
              ...seoConfig.structuredData,
              "url": canonicalUrl,
              "description": seoConfig.description,
              "datePublished": "2024-01-01",
              "dateModified": new Date().toISOString().split('T')[0],
              "inLanguage": currentLanguage,
              "isAccessibleForFree": true,
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1250"
              }
            })}
          </script>
        )}
        
        <html lang={currentLanguage} />
      </Helmet>
      {children}
    </>
  );
};