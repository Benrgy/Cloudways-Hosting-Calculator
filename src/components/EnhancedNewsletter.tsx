import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { NewsletterSignupForm } from '@/components/NewsletterSignupForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Gift, TrendingUp } from 'lucide-react';
export const EnhancedNewsletter = () => {
  const { t } = useLanguage();
  
  return (
    <div className="py-16 px-4 bg-gradient-to-br from-primary/5 to-emerald-50">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">{t('newsletter.title')}</h2>
              <p className="text-muted-foreground text-lg mb-6">{t('newsletter.description')}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="p-3 bg-emerald-100 rounded-full w-fit mx-auto mb-3">
                  <Gift className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold mb-2">{t('newsletter.benefit1')}</h3>
                <p className="text-sm text-muted-foreground">{t('newsletter.benefit1Description')}</p>
              </div>
              
              <div className="text-center">
                <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{t('newsletter.benefit2')}</h3>
                <p className="text-sm text-muted-foreground">{t('newsletter.benefit2Description')}</p>
              </div>
              
              <div className="text-center">
                <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-3">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">{t('newsletter.benefit3')}</h3>
                <p className="text-sm text-muted-foreground">{t('newsletter.benefit3Description')}</p>
              </div>
            </div>
            
            <NewsletterSignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};