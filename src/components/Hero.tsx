
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroProps {
  onCalculateClick: () => void;
}

export const Hero = ({ onCalculateClick }: HeroProps) => {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 px-4 text-center bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Main heading - only h1 on the page */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {t('hero.title') || 'See How Much You\'re Overpaying'}
          <span className="block text-emerald-300 text-3xl md:text-5xl mt-2">
            {t('hero.subtitle') || 'Most Businesses Save $200+ Monthly on Hosting'}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto leading-relaxed opacity-90">
          {t('hero.description') || 'Get instant hosting cost analysis and discover why 10,000+ businesses switched to Cloudways. Average user saves 67% on hosting costs.'}
        </p>

        {/* Social Proof */}
        <div className="flex justify-center items-center gap-6 mb-8 text-sm opacity-80">
          <div className="flex items-center gap-1">
            <span className="text-emerald-300 font-semibold">10,000+</span>
            <span>Sites Migrated</span>
          </div>
          <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          <div className="flex items-center gap-1">
            <span className="text-emerald-300 font-semibold">67%</span>
            <span>Avg. Savings</span>
          </div>
          <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          <div className="flex items-center gap-1">
            <span className="text-emerald-300 font-semibold">4.9/5</span>
            <span>Rating</span>
          </div>
        </div>
        
        {/* Key benefits */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm md:text-base">
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <Calculator className="w-5 h-5" aria-hidden="true" />
            <span>{t('hero.benefit1') || 'Free Calculator'}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <TrendingUp className="w-5 h-5" aria-hidden="true" />
            <span>{t('hero.benefit2') || 'Performance Analysis'}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <DollarSign className="w-5 h-5" aria-hidden="true" />
            <span>{t('hero.benefit3') || 'Cost Savings'}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <Clock className="w-5 h-5" aria-hidden="true" />
            <span>{t('hero.benefit4') || 'Instant Results'}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={onCalculateClick}
            className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            aria-describedby="calculator-description"
          >
            <Calculator className="w-6 h-6 mr-2" aria-hidden="true" />
            {t('hero.calculateButton') || 'Discover Your Overpayment (Free)'}
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold px-8 py-4 text-lg backdrop-blur-sm relative"
            onClick={() => window.open('https://platform.cloudways.com/signup', '_blank')}
            aria-label="Start free trial with Cloudways"
          >
            {t('hero.trialButton') || 'Start 3-Day FREE Trial'}
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
              FREE
            </span>
          </Button>
        </div>
        
        <p id="calculator-description" className="text-sm opacity-75 mt-4">
          {t('hero.disclaimer') || 'No credit card required • Free migration included • 24/7 expert support'}
        </p>
        
        {/* Enhanced trust indicators with urgency */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="mb-4">
            <p className="text-sm opacity-75 mb-2">
              {t('hero.trustIndicator') || 'Join 10,000+ businesses already saving with Cloudways'}
            </p>
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 text-yellow-200 px-3 py-1 rounded-full text-xs">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="font-medium">47 people calculated savings today</span>
            </div>
          </div>
          <div className="flex justify-center items-center gap-6 text-xs opacity-70">
            <span>✓ 99.99% Uptime SLA</span>
            <span>✓ Free Migration</span>
            <span>✓ No Setup Fees</span>
            <span>✓ Cancel Anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};
