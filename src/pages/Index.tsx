
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

const Index = () => {
  const { t, currentLanguage } = useLanguage();

  const handleCalculateClick = () => {
    const calculatorElement = document.getElementById('calculator');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('seo.title') || 'Cloudways Calculator - Find Your Perfect Hosting Plan'}</title>
        <meta name="description" content={t('seo.description') || 'Calculate and compare Cloudways hosting costs with our advanced calculator. Find the perfect hosting plan for your website with real-time pricing and recommendations.'} />
        <meta name="keywords" content={t('seo.keywords') || 'cloudways, hosting calculator, web hosting, cloud hosting, pricing calculator'} />
        <link rel="canonical" href={`https://cloudways-calculator.com${currentLanguage !== 'en' ? `/${currentLanguage}` : ''}`} />
        <meta property="og:title" content={t('seo.title') || 'Cloudways Calculator - Find Your Perfect Hosting Plan'} />
        <meta property="og:description" content={t('seo.description') || 'Calculate and compare Cloudways hosting costs with our advanced calculator.'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://cloudways-calculator.com${currentLanguage !== 'en' ? `/${currentLanguage}` : ''}`} />
        <html lang={currentLanguage} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
        <Header />
        <main>
          <Hero onCalculateClick={handleCalculateClick} />
          <div id="calculator">
            <Calculator />
          </div>
          <Features />
          <HowItWorks />
          <PricingComparison />
          <Testimonials />
          <FAQ />
          <EnhancedNewsletter />
          <SEOContent />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
