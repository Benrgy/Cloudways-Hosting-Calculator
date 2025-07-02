
import React, { Suspense } from 'react';
import { Calculator } from '@/components/Calculator';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { PricingComparison } from '@/components/PricingComparison';
import { SEOContent } from '@/components/SEOContent';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Lazy load components for better performance
const LazyTestimonials = React.lazy(() => import('@/components/Testimonials').then(module => ({ default: module.Testimonials })));
const LazyFAQ = React.lazy(() => import('@/components/FAQ').then(module => ({ default: module.FAQ })));
const LazyEnhancedNewsletter = React.lazy(() => import('@/components/EnhancedNewsletter').then(module => ({ default: module.EnhancedNewsletter })));

interface MainSectionsProps {
  onCalculateClick: () => void;
}

export const MainSections = ({ onCalculateClick }: MainSectionsProps) => {
  return (
    <main role="main">
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
      
      {/* Testimonials Section - Lazy loaded */}
      <section aria-labelledby="testimonials-heading">
        <Suspense fallback={
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" text="Loading testimonials..." />
          </div>
        }>
          <LazyTestimonials />
        </Suspense>
      </section>
      
      {/* FAQ Section - Lazy loaded */}
      <section id="faq" aria-labelledby="faq-heading">
        <Suspense fallback={
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" text="Loading FAQ..." />
          </div>
        }>
          <LazyFAQ />
        </Suspense>
      </section>
      
      {/* Newsletter Section - Lazy loaded */}
      <section aria-labelledby="newsletter-heading">
        <Suspense fallback={
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" text="Loading newsletter..." />
          </div>
        }>
          <LazyEnhancedNewsletter />
        </Suspense>
      </section>
      
      {/* SEO Content Section */}
      <SEOContent />
    </main>
  );
};
