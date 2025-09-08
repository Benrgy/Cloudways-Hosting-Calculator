
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Fallback data when Supabase is unavailable
const fallbackProviders = [
  {
    id: 'cloudways',
    name: 'Cloudways',
    is_active: true,
    base_url: 'https://www.cloudways.com',
    logo_url: null,
    pricing_api_endpoint: null,
    slug: 'cloudways',
    created_at: new Date().toISOString(),
    hosting_plans: [
      {
        id: 'starter',
        name: 'Starter',
        price_monthly: 12,
        price_annual: 120,
        storage_gb: 25,
        bandwidth_gb: 1000,
        cpu_cores: 1,
        ram_gb: 1,
        is_active: true,
        is_popular: false,
        provider_id: 'cloudways',
        slug: 'starter',
        created_at: new Date().toISOString(),
        features: ['Free SSL', '24/7 Support', 'SSD Storage']
      },
      {
        id: 'business',
        name: 'Business',
        price_monthly: 26,
        price_annual: 260,
        storage_gb: 50,
        bandwidth_gb: 2000,
        cpu_cores: 2,
        ram_gb: 2,
        is_active: true,
        is_popular: true,
        provider_id: 'cloudways',
        slug: 'business',
        created_at: new Date().toISOString(),
        features: ['Free SSL', '24/7 Support', 'SSD Storage', 'Staging Environment']
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price_monthly: 50,
        price_annual: 500,
        storage_gb: 100,
        bandwidth_gb: 5000,
        cpu_cores: 4,
        ram_gb: 8,
        is_active: true,
        is_popular: false,
        provider_id: 'cloudways',
        slug: 'enterprise',
        created_at: new Date().toISOString(),
        features: ['Free SSL', '24/7 Support', 'SSD Storage', 'Staging Environment', 'Advanced Monitoring']
      }
    ]
  },
  {
    id: 'digitalocean',
    name: 'DigitalOcean',
    is_active: true,
    base_url: 'https://www.digitalocean.com',
    logo_url: null,
    pricing_api_endpoint: null,
    slug: 'digitalocean',
    created_at: new Date().toISOString(),
    hosting_plans: [
      {
        id: 'basic',
        name: 'Basic',
        price_monthly: 18,
        price_annual: 180,
        storage_gb: 25,
        bandwidth_gb: 1000,
        cpu_cores: 1,
        ram_gb: 1,
        is_active: true,
        is_popular: false,
        provider_id: 'digitalocean',
        slug: 'basic',
        created_at: new Date().toISOString(),
        features: ['SSD Storage', 'Basic Support']
      },
      {
        id: 'professional',
        name: 'Professional',
        price_monthly: 35,
        price_annual: 350,
        storage_gb: 50,
        bandwidth_gb: 2000,
        cpu_cores: 2,
        ram_gb: 4,
        is_active: true,
        is_popular: true,
        provider_id: 'digitalocean',
        slug: 'professional',
        created_at: new Date().toISOString(),
        features: ['SSD Storage', '24/7 Support', 'Load Balancer']
      }
    ]
  }
];

export const useHostingProviders = () => {
  const { toast } = useToast();

  const {
    data: providers,
    isLoading,
    error
  } = useQuery({
    queryKey: ['hosting-providers'],
    queryFn: async () => {
      console.log('Fetching hosting providers...');
      
      try {
        const { data, error } = await supabase
          .from('hosting_providers')
          .select(`
            *,
            hosting_plans (*)
          `)
          .eq('is_active', true)
          .order('name');
        
        if (error) {
          console.error('Supabase error:', error);
          console.log('Using fallback provider data due to Supabase error');
          return fallbackProviders;
        }
        
        // If data is empty or null, use fallback
        if (!data || data.length === 0) {
          console.log('No providers found in database, using fallback data');
          return fallbackProviders;
        }
        
        console.log('Hosting providers fetched successfully:', data);
        return data;
      } catch (networkError) {
        console.error('Network/connection error:', networkError);
        console.log('Using fallback provider data due to connection error');
        return fallbackProviders;
      }
    },
    retry: 1, // Reduce retries since we have fallback
    retryDelay: 1000,
  });

  // Handle errors using useEffect instead of deprecated onError
  React.useEffect(() => {
    if (error) {
      console.error('Error fetching hosting providers:', error);
      toast({
        title: "Error",
        description: "Failed to load hosting providers. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return {
    providers: providers || [],
    isLoading,
    error
  };
};
