
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, Zap, Shield, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroProps {
  onCalculateClick: () => void;
}

export const Hero = ({ onCalculateClick }: HeroProps) => {
  const { t } = useLanguage();

  return (
    <section className="relative pt-20 pb-32 bg-gradient-to-br from-blue-50 to-emerald-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
            {t('hero.subtitle')}
          </h2>
          
          {/* Description */}
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={onCalculateClick}
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold"
            >
              <Calculator className="w-5 h-5 mr-2" />
              {t('hero.calculateSavings')}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold"
            >
              {t('hero.startTrial')}
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Calculator className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">{t('hero.trustIndicator1')}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">{t('hero.trustIndicator2')}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">{t('hero.trustIndicator3')}</div>
              </div>
            </div>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('hero.instantCalculations')}</h3>
              <p className="text-gray-600 text-sm">{t('hero.instantCalculationsDesc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('hero.performanceBoost')}</h3>
              <p className="text-gray-600 text-sm">{t('hero.performanceBoostDesc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('hero.betterSecurity')}</h3>
              <p className="text-gray-600 text-sm">{t('hero.betterSecurityDesc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('hero.freeMigration')}</h3>
              <p className="text-gray-600 text-sm">{t('hero.freeMigrationDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
