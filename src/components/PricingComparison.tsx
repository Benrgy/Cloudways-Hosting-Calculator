import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHostingProviders } from '@/hooks/useHostingProviders';
import { PricingCardSkeleton } from './LoadingSkeleton';
export const PricingComparison = () => {
  const {
    t
  } = useLanguage();
  const {
    providers,
    isLoading,
    error
  } = useHostingProviders();

  // Create featured plans from Supabase data
  const getFeaturedPlans = () => {
    if (!providers || providers.length === 0) return [];
    const allPlans = providers.flatMap(provider => provider.hosting_plans?.map(plan => ({
      ...plan,
      providerName: provider.name,
      providerSlug: provider.slug
    })) || []);

    // Sort by price and pick diverse options
    const sortedPlans = allPlans.sort((a, b) => a.price_monthly - b.price_monthly);
    return [sortedPlans[0],
    // Cheapest
    sortedPlans[Math.floor(sortedPlans.length / 2)],
    // Middle
    sortedPlans[sortedPlans.length - 1] // Most expensive
    ].filter(Boolean);
  };
  const featuredPlans = getFeaturedPlans();

  // Fallback static plans if no data from Supabase
  const staticPlans = [{
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
  }, {
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
  }, {
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
  }];
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          {t('pricingComparison.title') || 'Compare Hosting Plans'}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCardSkeleton />
          <PricingCardSkeleton />
          <PricingCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
        {t('pricingComparison.title') || 'Popular Cloudways Hosting Plans'}
      </h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        {t('pricingComparison.subtitle') || 'Start with the perfect plan for your needs. Scale as you grow.'}
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plansToShow.map((plan, index) => (
          <Card 
            key={`${plan.providerName}-${plan.name}-${index}`}
            className={`relative ${plan.is_popular ? 'border-primary shadow-lg scale-105' : ''} hover:shadow-xl transition-all duration-300`}
          >
            {plan.is_popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                <Star className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
            )}
            
            <CardHeader>
              <CardTitle className="flex flex-col gap-2">
                <span className="text-lg text-muted-foreground">{plan.providerName}</span>
                <span className="text-2xl">{plan.name}</span>
              </CardTitle>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-4xl font-bold text-foreground">${plan.price_monthly}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {getFeatureList(plan).map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full mt-6 ${plan.is_popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                size="lg"
                asChild
              >
                <a 
                  href="https://www.cloudways.com/en/?id=1293297" 
                  target="_blank" 
                  rel="noopener noreferrer sponsored"
                  className="flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  {plan.is_popular ? 'Start Free Trial' : 'Get Started'}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-4">
          Not sure which plan is right for you?
        </p>
        <Button variant="outline" size="lg" onClick={() => {
          document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          Try Our Calculator
        </Button>
      </div>
    </div>
  );
};