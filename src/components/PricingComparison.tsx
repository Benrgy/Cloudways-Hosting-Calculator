
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHostingProviders } from '@/hooks/useHostingProviders';
import { PricingCardSkeleton } from './LoadingSkeleton';

export const PricingComparison = () => {
  const { t } = useLanguage();
  const { providers, isLoading, error } = useHostingProviders();

  // Create featured plans from Supabase data
  const getFeaturedPlans = () => {
    if (!providers || providers.length === 0) return [];
    
    const allPlans = providers.flatMap(provider => 
      provider.hosting_plans?.map(plan => ({
        ...plan,
        providerName: provider.name,
        providerSlug: provider.slug
      })) || []
    );
    
    // Sort by price and pick diverse options
    const sortedPlans = allPlans.sort((a, b) => a.price_monthly - b.price_monthly);
    
    return [
      sortedPlans[0], // Cheapest
      sortedPlans[Math.floor(sortedPlans.length / 2)], // Middle
      sortedPlans[sortedPlans.length - 1] // Most expensive
    ].filter(Boolean);
  };

  const featuredPlans = getFeaturedPlans();

  // Fallback static plans if no data from Supabase
  const staticPlans = [
    {
      name: "DigitalOcean Basic",
      providerName: "DigitalOcean",
      price_monthly: 12,
      is_popular: false,
      ram_gb: 1,
      cpu_cores: 1,
      storage_gb: 25,
      bandwidth_gb: 1000,
      features: {
        ssl: true,
        backup: true,
        support: true,
        caching: false,
        monitoring: false,
        cdn: false
      }
    },
    {
      name: "DigitalOcean Standard",
      providerName: "DigitalOcean",
      price_monthly: 24,
      is_popular: true,
      ram_gb: 2,
      cpu_cores: 1,
      storage_gb: 50,
      bandwidth_gb: 2000,
      features: {
        ssl: true,
        backup: true,
        support: true,
        caching: true,
        monitoring: false,
        cdn: false
      }
    },
    {
      name: "AWS Premium",
      providerName: "AWS",
      price_monthly: 42,
      is_popular: false,
      ram_gb: 2,
      cpu_cores: 2,
      storage_gb: 80,
      bandwidth_gb: 4000,
      features: {
        ssl: true,
        backup: true,
        support: true,
        caching: true,
        monitoring: true,
        cdn: true
      }
    }
  ];

  const plansToShow = featuredPlans.length > 0 ? featuredPlans : staticPlans;

  const getFeatureList = (plan: any) => {
    const features = [];
    
    // Add basic specs
    if (plan.ram_gb) features.push(`${plan.ram_gb}GB RAM`);
    if (plan.cpu_cores) features.push(`${plan.cpu_cores} CPU Core${plan.cpu_cores > 1 ? 's' : ''}`);
    if (plan.storage_gb) features.push(`${plan.storage_gb}GB Storage`);
    if (plan.bandwidth_gb) features.push(`${plan.bandwidth_gb}GB Bandwidth`);
    
    // Add feature-based items
    const planFeatures = plan.features || {};
    if (planFeatures.ssl !== false) features.push('Free SSL');
    if (planFeatures.backup !== false) features.push('Daily Backups');
    if (planFeatures.support !== false) features.push('24/7 Support');
    if (planFeatures.caching) features.push('Advanced Caching');
    if (planFeatures.monitoring) features.push('Advanced Monitoring');
    if (planFeatures.cdn) features.push('Global CDN');
    
    return features;
  };

  if (error) {
    console.error('Error loading pricing data:', error);
  }

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('pricing.title') || 'Simple, Transparent Pricing'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('pricing.subtitle') || 'Choose the perfect plan for your hosting needs. All plans include premium features and 24/7 support.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <PricingCardSkeleton key={index} />
            ))
          ) : (
            plansToShow.map((plan, index) => (
              <Card 
                key={plan.id || index} 
                className={`relative transition-all duration-300 hover:shadow-lg ${
                  plan.is_popular 
                    ? 'border-emerald-500 shadow-lg scale-105 bg-gradient-to-b from-emerald-50 to-white' 
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                {plan.is_popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg">
                      <Star className="w-4 h-4 mr-1" />
                      {t('pricing.popular') || 'Most Popular'}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-4">
                    {plan.name}
                  </CardTitle>
                  <div className="text-sm text-gray-600 mb-4">
                    {plan.providerName}
                  </div>
                  <div className="relative">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price_monthly}
                    </span>
                    <span className="text-gray-600 ml-2">
                      {t('pricing.monthly') || '/month'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {t('pricing.billedMonthly') || 'Billed monthly'}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {getFeatureList(plan).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full transition-all duration-300 ${
                      plan.is_popular 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl' 
                        : 'bg-gray-100 hover:bg-emerald-50 text-gray-900 hover:text-emerald-700 border-2 border-transparent hover:border-emerald-200'
                    }`}
                    onClick={() => window.open('https://platform.cloudways.com/signup', '_blank')}
                  >
                    {plan.is_popular && <Zap className="w-4 h-4 mr-2" />}
                    {t('pricing.getStarted') || 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {t('pricing.allPlansInclude') || 'All plans include free migration, SSL certificates, and 24/7 expert support. No setup fees, cancel anytime.'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Badge variant="outline" className="bg-white border-emerald-200 text-emerald-700">
              {t('pricing.noSetupFees') || 'No Setup Fees'}
            </Badge>
            <Badge variant="outline" className="bg-white border-emerald-200 text-emerald-700">
              {t('pricing.cancelAnytime') || 'Cancel Anytime'}
            </Badge>
            <Badge variant="outline" className="bg-white border-emerald-200 text-emerald-700">
              {t('pricing.uptimeSLA') || '99.9% Uptime SLA'}
            </Badge>
            <Badge variant="outline" className="bg-white border-emerald-200 text-emerald-700">
              {t('pricing.freeMigration') || 'Free Migration'}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};
