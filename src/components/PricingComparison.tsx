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
  return;
};