
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useSavedCalculations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: calculations,
    isLoading,
    error
  } = useQuery({
    queryKey: ['saved-calculations', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('saved_calculations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const saveCalculationMutation = useMutation({
    mutationFn: async ({ name, inputs, results, tags }: {
      name: string;
      inputs: any;
      results: any;
      tags?: string[];
    }) => {
      if (!user?.id) throw new Error('No user ID');
      
      const { error } = await supabase
        .from('saved_calculations')
        .insert({
          user_id: user.id,
          name,
          inputs,
          results,
          tags: tags || [],
          created_at: new Date().toISOString()
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-calculations'] });
      toast({
        title: "Calculation Saved",
        description: "Your calculation has been saved successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Save Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const deleteCalculationMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('saved_calculations')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id || '');
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-calculations'] });
      toast({
        title: "Calculation Deleted",
        description: "The calculation has been removed.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Delete Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: async ({ id, isFavorite }: { id: string; isFavorite: boolean }) => {
      const { error } = await supabase
        .from('saved_calculations')
        .update({ 
          is_favorite: isFavorite,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user?.id || '');
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-calculations'] });
    }
  });

  return {
    calculations,
    isLoading,
    error,
    saveCalculation: saveCalculationMutation.mutate,
    deleteCalculation: deleteCalculationMutation.mutate,
    toggleFavorite: toggleFavoriteMutation.mutate,
    isSaving: saveCalculationMutation.isPending,
    isDeleting: deleteCalculationMutation.isPending
  };
};
