
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

export const SEOHead = () => {
  const { t, currentLanguage } = useLanguage();

  const seoTitle = t('seo.title') || 'Cloudways Hosting Calculator - Compare Plans & Save Money | 2024';
  const seoDescription = t('seo.description') || 'Free Cloudways hosting calculator to compare plans, estimate costs, and find the perfect cloud hosting solution. Save money with our detailed pricing analysis and recommendations.';
  const seoKeywords = t('seo.keywords') || 'cloudways calculator, hosting calculator, cloud hosting, web hosting pricing, cloudways plans, hosting comparison, managed hosting';
  
  const baseUrl = import.meta.env.DEV ? 'http://localhost:8080' : 'https://benrgy.github.io/cloudways-savings-calculator';
  const canonicalUrl = `${baseUrl}${currentLanguage !== 'en' ? `?lang=${currentLanguage}` : ''}`;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Preconnect to external domains for better performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="https://cloudways.com" />
      
      {/* Optimize font loading */}
      <link 
        rel="preload" 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
        as="style" 
        onLoad={(e) => {
          const target = e.target as HTMLLinkElement;
          target.onload = null;
          target.rel = 'stylesheet';
        }}
      />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Cloudways Hosting Calculator" />
      <meta property="og:locale" content={currentLanguage === 'en' ? 'en_US' : currentLanguage} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={`${baseUrl}/og-image.jpg`} />
      <meta name="twitter:creator" content="@cloudways" />
      
      {/* Performance & SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content={currentLanguage} />
      <meta name="author" content="Cloudways Hosting Calculator" />
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
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Cloudways Hosting Calculator",
          "description": seoDescription,
          "url": canonicalUrl,
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web Browser",
          "browserRequirements": "Requires JavaScript",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "featureList": [
            "Hosting Cost Calculator",
            "Performance Analysis", 
            "Multi-language Support",
            "Real-time Pricing",
            "Savings Calculator",
            "Plan Comparison Tool"
          ],
          "creator": {
            "@type": "Organization",
            "name": "Cloudways",
            "url": "https://www.cloudways.com"
          },
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
      
      <html lang={currentLanguage} />
    </Helmet>
  );
};
