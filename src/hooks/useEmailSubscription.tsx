
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useEmailSubscription = () => {
  const { toast } = useToast();

  const subscribeToNewsletter = useMutation({
    mutationFn: async ({ email, name, source = 'calculator' }: {
      email: string;
      name?: string;
      source?: string;
    }) => {
      const { error } = await supabase
        .from('email_subscribers')
        .insert({
          email,
          name,
          source,
          subscribed_at: new Date().toISOString()
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
    },
    onError: (error: any) => {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: error.message || "Failed to subscribe to newsletter",
        variant: "destructive",
      });
    }
  });

  return {
    subscribe: subscribeToNewsletter.mutate,
    isSubscribing: subscribeToNewsletter.isPending
  };
};
