import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, TrendingUp, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroProps {
  onCalculateClick: () => void;
}

export const Hero = ({ onCalculateClick }: HeroProps) => {
  const { t } = useLanguage();

  const handleLearnMoreClick = () => {
    window.open('https://www.cloudways.com/en/?id=1384181', '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
              <Calculator className="w-4 h-4 mr-2" />
              {t('hero.badge')}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg"
                onClick={onCalculateClick}
              >
                {t('hero.startCalculation')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg"
                onClick={handleLearnMoreClick}
              >
                {t('hero.learnMore')}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-emerald-600">3x</div>
                <div className="text-sm text-gray-600">{t('hero.fasterLoading')}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-emerald-600">99.9%</div>
                <div className="text-sm text-gray-600">{t('hero.uptime')}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-emerald-600">50%</div>
                <div className="text-sm text-gray-600">{t('hero.averageSavings')}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Hosting Cost</span>
                  <span className="text-2xl font-bold text-red-500">$15/mo</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Cloudways Cost</span>
                  <span className="text-2xl font-bold text-emerald-500">$10/mo</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-semibold">Monthly Savings</span>
                    <span className="text-2xl font-bold text-emerald-600">$5</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Annual Savings</span>
                    <span className="font-semibold text-emerald-600">$60</span>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-lg p-4 mt-6">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600 mr-2" />
                    <span className="text-emerald-700 font-medium">Performance Boost</span>
                  </div>
                  <div className="text-sm text-emerald-600">
                    + 200% faster loading times
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -z-10 top-4 left-4 w-full h-full bg-emerald-100 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
