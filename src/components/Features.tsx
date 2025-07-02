
import React from 'react';
import { Calculator, TrendingUp, Shield, Zap, Globe, HeadphonesIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Calculator,
      title: t('features.calculator.title') || 'Advanced Calculator',
      description: t('features.calculator.description') || 'Calculate hosting costs with precision using our advanced algorithms and real-time pricing data.',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      icon: TrendingUp,
      title: t('features.analysis.title') || 'Performance Analysis',
      description: t('features.analysis.description') || 'Get detailed performance insights and recommendations to optimize your hosting setup.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Shield,
      title: t('features.security.title') || 'Security Features',
      description: t('features.security.description') || 'Compare security features across different hosting plans to ensure your site stays protected.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Zap,
      title: t('features.speed.title') || 'Speed Optimization',
      description: t('features.speed.description') || 'Analyze speed and performance metrics to choose the fastest hosting solution for your needs.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: Globe,
      title: t('features.global.title') || 'Global Coverage',
      description: t('features.global.description') || 'Compare hosting locations and global infrastructure to serve your audience better.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      icon: HeadphonesIcon,
      title: t('features.support.title') || '24/7 Support Analysis',
      description: t('features.support.description') || 'Evaluate support quality and availability across different hosting providers.',
      color: 'text-rose-600',
      bgColor: 'bg-rose-100'
    }
  ];

  return (
    <section className="py-20 bg-white" aria-labelledby="features-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('features.title') || 'Powerful Features for Smart Hosting Decisions'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.subtitle') || 'Our comprehensive calculator provides everything you need to make informed hosting decisions and maximize your investment.'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="group p-8 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 ${feature.color}`} aria-hidden="true" />
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
        
        {/* Additional CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('features.cta.title') || 'Ready to Find Your Perfect Hosting Plan?'}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('features.cta.description') || 'Use our advanced calculator to compare plans, estimate costs, and discover potential savings.'}
            </p>
            <button
              onClick={() => {
                const calculatorElement = document.getElementById('calculator');
                if (calculatorElement) {
                  calculatorElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Go to hosting calculator"
            >
              {t('features.cta.button') || 'Start Calculating'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
