
import React from 'react';
import { Calculator, Search, Download, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      title: t('howItWorks.step1Title') || 'Enter Your Details',
      description: t('howItWorks.step1Desc') || 'Input your current hosting costs and website requirements'
    },
    {
      icon: Calculator,
      title: t('howItWorks.step2Title') || 'Calculate Savings',
      description: t('howItWorks.step2Desc') || 'Our calculator analyzes and compares hosting options'
    },
    {
      icon: Download,
      title: t('howItWorks.step3Title') || 'Get Recommendations',
      description: t('howItWorks.step3Desc') || 'Receive personalized hosting plan recommendations'
    },
    {
      icon: CheckCircle,
      title: t('howItWorks.step4Title') || 'Start Saving',
      description: t('howItWorks.step4Desc') || 'Switch to Cloudways and start saving money today'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('howItWorks.title') || 'How It Works'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('howItWorks.subtitle') || 'Calculate your potential savings in just a few simple steps'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
