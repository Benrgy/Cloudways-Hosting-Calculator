
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { NewsletterSignupForm } from '@/components/NewsletterSignupForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Gift, TrendingUp } from 'lucide-react';

export const EnhancedNewsletter = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-blue-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  {t('newsletter.title')}
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  {t('newsletter.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Exclusive Deals</h3>
                  <p className="text-white/80 text-sm">Get access to special hosting discounts</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Performance Tips</h3>
                  <p className="text-white/80 text-sm">Learn how to optimize your website</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Latest Updates</h3>
                  <p className="text-white/80 text-sm">Stay informed about hosting trends</p>
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <NewsletterSignupForm />
                <p className="text-center text-white/70 text-sm mt-4">
                  {t('newsletter.privacy')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
