
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

  const seoTitle = t('seo.title') || 'Cloudways Calculator - Find Your Perfect Hosting Plan';
  const seoDescription = t('seo.description') || 'Calculate and compare Cloudways hosting costs with our advanced calculator. Find the perfect hosting plan for your website with real-time pricing and recommendations.';
  const seoKeywords = t('seo.keywords') || 'cloudways, hosting calculator, web hosting, cloud hosting, pricing calculator';
  
  const canonicalUrl = `https://cloudways-calculator.com${currentLanguage !== 'en' ? `/${currentLanguage}` : ''}`;

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
        <meta property="og:image" content="https://cloudways-calculator.com/og-image.jpg" />
        <meta property="og:site_name" content="Cloudways Calculator" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="https://cloudways-calculator.com/og-image.jpg" />
        
        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content={currentLanguage} />
        <meta name="author" content="Cloudways Calculator" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Cloudways Calculator",
            "description": seoDescription,
            "url": canonicalUrl,
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Hosting Cost Calculator",
              "Performance Analysis",
              "Multi-language Support",
              "Real-time Pricing",
              "Savings Calculator"
            ]
          })}
        </script>
        
        <html lang={currentLanguage} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
        <Header />
        <main>
          <Hero onCalculateClick={handleCalculateClick} />
          <div id="calculator">
            <Calculator />
          </div>
          <div id="features">
            <Features />
          </div>
          <HowItWorks />
          <div id="pricing">
            <PricingComparison />
          </div>
          
          <Suspense fallback={<LoadingSpinner />}>
            <LazyTestimonials />
          </Suspense>
          
          <div id="faq">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyFAQ />
            </Suspense>
          </div>
          
          <Suspense fallback={<LoadingSpinner />}>
            <LazyEnhancedNewsletter />
          </Suspense>
          
          <SEOContent />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Index;
