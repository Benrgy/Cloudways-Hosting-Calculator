import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { NewsletterSignupForm } from '@/components/NewsletterSignupForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Gift, TrendingUp } from 'lucide-react';
export const EnhancedNewsletter = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4 text-primary">
              <Mail className="h-8 w-8" />
              <Gift className="h-8 w-8" />
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t('newsletter.title') || 'Stay Updated with Latest Hosting Deals'}
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            {t('newsletter.description') || 'Get exclusive hosting deals, performance tips, and calculator updates delivered to your inbox.'}
          </p>
          
          <Card className="p-6">
            <CardContent className="p-0">
              <NewsletterSignupForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};