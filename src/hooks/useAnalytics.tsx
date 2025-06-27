
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AnalyticsEvent {
  event_type: string;
  event_data?: any;
  session_id?: string;
}

export const useAnalytics = () => {
  const { user } = useAuth();

  const trackEventMutation = useMutation({
    mutationFn: async (event: AnalyticsEvent) => {
      const { error } = await supabase
        .from('analytics_events')
        .insert({
          user_id: user?.id || null,
          event_type: event.event_type,
          event_data: event.event_data || {},
          session_id: event.session_id || crypto.randomUUID(),
          user_agent: navigator.userAgent,
          created_at: new Date().toISOString()
        });
      
      if (error) throw error;
    },
    onError: (error) => {
      console.error('Analytics tracking failed:', error);
    }
  });

  const trackEvent = (eventType: string, eventData?: any) => {
    trackEventMutation.mutate({
      event_type: eventType,
      event_data: eventData,
      session_id: sessionStorage.getItem('session_id') || crypto.randomUUID()
    });
  };

  const trackCalculation = (inputs: any, results: any) => {
    trackEvent('calculation_performed', {
      inputs,
      results,
      timestamp: new Date().toISOString()
    });
  };

  const trackSaveCalculation = (calculationName: string) => {
    trackEvent('calculation_saved', {
      calculation_name: calculationName,
      timestamp: new Date().toISOString()
    });
  };

  const trackPageView = (page: string) => {
    trackEvent('page_view', {
      page,
      timestamp: new Date().toISOString()
    });
  };

  return {
    trackEvent,
    trackCalculation,
    trackSaveCalculation,
    trackPageView,
    isTracking: trackEventMutation.isPending
  };
};
