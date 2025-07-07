import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { NewsletterSignupForm } from '@/components/NewsletterSignupForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Gift, TrendingUp } from 'lucide-react';
export const EnhancedNewsletter = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5" aria-labelledby="newsletter-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="newsletter-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('newsletter.title') || 'Stay Updated with Hosting Tips'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('newsletter.subtitle') || 'Get the latest hosting insights, cost optimization tips, and exclusive deals delivered to your inbox.'}
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Weekly Tips</h3>
                <p className="text-sm text-muted-foreground">Hosting optimization strategies</p>
              </div>
              <div className="text-center">
                <Gift className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Exclusive Deals</h3>
                <p className="text-sm text-muted-foreground">Special discounts and offers</p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Cost Insights</h3>
                <p className="text-sm text-muted-foreground">Industry trends and analysis</p>
              </div>
            </div>

            <NewsletterSignupForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};