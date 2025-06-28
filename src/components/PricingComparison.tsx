
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { useHostingProviders } from '@/hooks/useHostingProviders';
import { useLanguage } from '@/contexts/LanguageContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const PricingComparison = () => {
  const { providers, isLoading, error } = useHostingProviders();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600">{t('pricing.loading') || 'Loading pricing information...'}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">{t('pricing.error') || 'Failed to load pricing information'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('pricing.title') || 'Compare Hosting Plans'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('pricing.subtitle') || 'Find the perfect hosting solution for your needs'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers?.map((provider) => (
            <div key={provider.id} className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{provider.name}</h3>
                {provider.logo_url && (
                  <img
                    src={provider.logo_url}
                    alt={`${provider.name} logo`}
                    className="h-12 mx-auto mb-4"
                  />
                )}
              </div>
              
              {provider.hosting_plans?.map((plan: any) => (
                <Card key={plan.id} className={`relative ${plan.is_popular ? 'ring-2 ring-emerald-500' : ''}`}>
                  {plan.is_popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-emerald-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        {t('pricing.popular') || 'Popular'}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-emerald-600">
                        ${plan.price_monthly}
                      </span>
                      <span className="text-gray-600 ml-1">/month</span>
                      {plan.price_annual && (
                        <div className="text-sm text-gray-500 mt-1">
                          ${plan.price_annual}/year ({Math.round((1 - plan.price_annual / (plan.price_monthly * 12)) * 100)}% off)
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {plan.cpu_cores && (
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-emerald-500 mr-2" />
                          <span className="text-sm">{plan.cpu_cores} CPU Core{plan.cpu_cores > 1 ? 's' : ''}</span>
                        </li>
                      )}
                      {plan.ram_gb && (
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-emerald-500 mr-2" />
                          <span className="text-sm">{plan.ram_gb}GB RAM</span>
                        </li>
                      )}
                      {plan.storage_gb && (
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-emerald-500 mr-2" />
                          <span className="text-sm">{plan.storage_gb}GB Storage</span>
                        </li>
                      )}
                      {plan.bandwidth_gb && (
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-emerald-500 mr-2" />
                          <span className="text-sm">{plan.bandwidth_gb}GB Bandwidth</span>
                        </li>
                      )}
                      {plan.features && Object.entries(plan.features).map(([key, value]) => (
                        value && (
                          <li key={key} className="flex items-center">
                            <Check className="w-4 h-4 text-emerald-500 mr-2" />
                            <span className="text-sm capitalize">{key.replace('_', ' ')}</span>
                          </li>
                        )
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full" 
                      variant={plan.is_popular ? "default" : "outline"}
                      onClick={() => {
                        if (provider.base_url) {
                          window.open(provider.base_url, '_blank');
                        }
                      }}
                    >
                      {t('pricing.getStarted') || 'Get Started'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
