import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { NewsletterSignupForm } from '@/components/NewsletterSignupForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Gift, TrendingUp } from 'lucide-react';
export const EnhancedNewsletter = () => {
  const { t } = useLanguage();
  
  return (
    <div className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8">
          <CardContent className="text-center space-y-6">
            <div className="flex justify-center space-x-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div className="p-3 bg-secondary/10 rounded-full">
                <Gift className="h-6 w-6 text-secondary" />
              </div>
              <div className="p-3 bg-accent/10 rounded-full">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-foreground">
              Stay Updated with Hosting Insights
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get exclusive hosting tips, cost-saving strategies, and the latest industry insights delivered to your inbox.
            </p>
            
            <NewsletterSignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};