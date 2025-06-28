
import React from 'react';
import { Calculator, Zap, Shield, Users, BarChart3, Headphones } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Calculator,
      title: t('features.f1Title'),
      description: t('features.f1Desc')
    },
    {
      icon: Zap,
      title: t('features.f2Title'),
      description: t('features.f2Desc')
    },
    {
      icon: Shield,
      title: t('features.f3Title'),
      description: t('features.f3Desc')
    },
    {
      icon: Users,
      title: t('features.f4Title'),
      description: t('features.f4Desc')
    },
    {
      icon: BarChart3,
      title: t('features.f5Title'),
      description: t('features.f5Desc')
    },
    {
      icon: Headphones,
      title: t('features.f6Title'),
      description: t('features.f6Desc')
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
