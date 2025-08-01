import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { NewsletterSignupForm } from '@/components/NewsletterSignupForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Gift, TrendingUp } from 'lucide-react';
export const EnhancedNewsletter = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Mail className="w-12 h-12 mx-auto text-primary mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest hosting insights, cost optimization tips, and exclusive offers delivered to your inbox.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <CardContent className="pt-0">
                <Gift className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Exclusive Offers</h3>
                <p className="text-sm text-muted-foreground">
                  Get access to special discounts and promotions from top hosting providers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-0">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Industry Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Stay ahead with the latest trends and best practices in web hosting.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-0">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Weekly Tips</h3>
                <p className="text-sm text-muted-foreground">
                  Receive actionable tips to optimize your hosting costs and performance.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <NewsletterSignupForm />
        </div>
      </div>
    </section>
  );
};