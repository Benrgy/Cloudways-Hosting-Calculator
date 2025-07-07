import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { NewsletterSignupForm } from '@/components/NewsletterSignupForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Gift, TrendingUp } from 'lucide-react';
export const EnhancedNewsletter = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">
                    {t('newsletter.title') || 'Stay Updated'}
                  </h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  {t('newsletter.description') || 'Get the latest hosting tips, cost optimization strategies, and exclusive deals delivered to your inbox.'}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {t('newsletter.benefit1') || 'Exclusive discounts'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {t('newsletter.benefit2') || 'Cost optimization tips'}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <NewsletterSignupForm />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};