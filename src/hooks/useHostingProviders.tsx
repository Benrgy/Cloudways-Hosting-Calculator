
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
      const { data, error } = await supabase
        .from('hosting_providers')
        .select(`
          *,
          hosting_plans (*)
        `)
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  // Handle errors using useEffect instead of onError
  React.useEffect(() => {
    if (error) {
      console.error('Error fetching hosting providers:', error);
      toast({
        title: "Error",
        description: "Failed to load hosting providers",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return {
    providers,
    isLoading,
    error
  };
};
