
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
        throw error;
      }
      
      console.log('Hosting providers fetched successfully:', data);
      return data || [];
    },
    retry: 3,
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
