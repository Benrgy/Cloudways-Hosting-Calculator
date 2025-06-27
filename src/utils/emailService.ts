
import { supabase } from '@/integrations/supabase/client';

export interface EmailSubscription {
  email: string;
  name?: string;
  source?: string;
  preferences?: {
    newsletter: boolean;
    updates: boolean;
    marketing: boolean;
  };
}

export const subscribeToNewsletter = async (subscription: EmailSubscription) => {
  try {
    const { error } = await supabase
      .from('email_subscribers')
      .insert({
        email: subscription.email,
        name: subscription.name,
        source: subscription.source || 'calculator',
        preferences: subscription.preferences || {
          newsletter: true,
          updates: true,
          marketing: false
        },
        subscribed_at: new Date().toISOString()
      });

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Newsletter subscription failed:', error);
    return { success: false, error: error.message };
  }
};

export const unsubscribeFromNewsletter = async (email: string) => {
  try {
    const { error } = await supabase
      .from('email_subscribers')
      .update({
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', email);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Unsubscribe failed:', error);
    return { success: false, error: error.message };
  }
};

export const updateSubscriptionPreferences = async (
  email: string, 
  preferences: { newsletter: boolean; updates: boolean; marketing: boolean }
) => {
  try {
    const { error } = await supabase
      .from('email_subscribers')
      .update({ preferences })
      .eq('email', email);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Preference update failed:', error);
    return { success: false, error: error.message };
  }
};
