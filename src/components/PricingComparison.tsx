
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const PricingComparison = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: "DigitalOcean Basic",
      price: 12,
      popular: false,
      features: [
        "1GB RAM",
        "1 CPU Core",
        "25GB Storage",
        "1TB Bandwidth",
        "Free SSL",
        "24/7 Support"
      ]
    },
    {
      name: "DigitalOcean Standard",
      price: 24,
      popular: true,
      features: [
        "2GB RAM",
        "1 CPU Core",
        "50GB Storage",
        "2TB Bandwidth",
        "Free SSL",
        "Advanced Caching",
        "24/7 Support"
      ]
    },
    {
      name: "AWS Premium",
      price: 42,
      popular: false,
      features: [
        "2GB RAM",
        "2 CPU Cores",
        "80GB Storage",
        "4TB Bandwidth",
        "Free SSL",
        "Auto-scaling",
        "24/7 Support",
        "Advanced Monitoring"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-emerald-500 shadow-lg scale-105' : 'border-gray-200'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-emerald-600 text-white px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    {t('pricing.popular')}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {t('pricing.monthly')}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {t('pricing.getStarted')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include free migration, SSL certificates, and 24/7 expert support
          </p>
          <div className="flex justify-center items-center space-x-4">
            <Badge variant="outline">No Setup Fees</Badge>
            <Badge variant="outline">Cancel Anytime</Badge>
            <Badge variant="outline">99.9% Uptime SLA</Badge>
          </div>
        </div>
      </div>
    </section>
  );
};
