
import React, { Suspense } from 'react';
import { Hero } from '@/components/Hero';
import { Calculator } from '@/components/Calculator';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { PricingComparison } from '@/components/PricingComparison';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { EnhancedNewsletter } from '@/components/EnhancedNewsletter';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SEOContent } from '@/components/SEOContent';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Lazy load components for better performance
const LazyTestimonials = React.lazy(() => import('@/components/Testimonials').then(module => ({ default: module.Testimonials })));
const LazyFAQ = React.lazy(() => import('@/components/FAQ').then(module => ({ default: module.FAQ })));
const LazyEnhancedNewsletter = React.lazy(() => import('@/components/EnhancedNewsletter').then(module => ({ default: module.EnhancedNewsletter })));

const Index = () => {
  const { t, currentLanguage } = useLanguage();

  const handleCalculateClick = () => {
    const calculatorElement = document.getElementById('calculator');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const seoTitle = t('seo.title') || 'Cloudways Hosting Calculator - Compare Plans & Save Money | 2024';
  const seoDescription = t('seo.description') || 'Free Cloudways hosting calculator to compare plans, estimate costs, and find the perfect cloud hosting solution. Save money with our detailed pricing analysis and recommendations.';
  const seoKeywords = t('seo.keywords') || 'cloudways calculator, hosting calculator, cloud hosting, web hosting pricing, cloudways plans, hosting comparison, managed hosting';
  
  const baseUrl = import.meta.env.DEV ? 'http://localhost:8080' : 'https://benrgy.github.io/cloudways-savings-calculator';
  const canonicalUrl = `${baseUrl}${currentLanguage !== 'en' ? `?lang=${currentLanguage}` : ''}`;

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        
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
        
        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content={currentLanguage} />
        <meta name="author" content="Cloudways Hosting Calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#059669" />
        
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
            "isAccessibleForFree": true
          })}
        </script>
        
        <html lang={currentLanguage} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
        <Header />
        <main role="main">
          {/* Hero Section with proper h1 */}
          <Hero onCalculateClick={handleCalculateClick} />
          
          {/* Calculator Section */}
          <section id="calculator" aria-labelledby="calculator-heading">
            <Calculator />
          </section>
          
          {/* Features Section */}
          <section id="features" aria-labelledby="features-heading">
            <Features />
          </section>
          
          {/* How It Works Section */}
          <section aria-labelledby="how-it-works-heading">
            <HowItWorks />
          </section>
          
          {/* Pricing Comparison Section */}
          <section id="pricing" aria-labelledby="pricing-heading">
            <PricingComparison />
          </section>
          
          {/* Testimonials Section */}
          <section aria-labelledby="testimonials-heading">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyTestimonials />
            </Suspense>
          </section>
          
          {/* FAQ Section */}
          <section id="faq" aria-labelledby="faq-heading">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyFAQ />
            </Suspense>
          </section>
          
          {/* Newsletter Section */}
          <section aria-labelledby="newsletter-heading">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyEnhancedNewsletter />
            </Suspense>
          </section>
          
          {/* SEO Content Section */}
          <SEOContent />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Index;
