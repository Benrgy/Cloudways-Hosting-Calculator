import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { NewsletterSignupForm } from '@/components/NewsletterSignupForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Gift, TrendingUp } from 'lucide-react';
export const EnhancedNewsletter = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Mail,
      title: t('newsletter.benefit1Title') || 'Exclusive Tips',
      description: t('newsletter.benefit1Desc') || 'Get insider hosting optimization strategies'
    },
    {
      icon: Gift,
      title: t('newsletter.benefit2Title') || 'Special Offers',
      description: t('newsletter.benefit2Desc') || 'Early access to Cloudways promotions'
    },
    {
      icon: TrendingUp,
      title: t('newsletter.benefit3Title') || 'Cost Savings',
      description: t('newsletter.benefit3Desc') || 'Weekly tips to reduce hosting costs'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 id="newsletter-heading" className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t('newsletter.title') || 'Join 10,000+ Smart Website Owners'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('newsletter.subtitle') || 'Get weekly hosting insights, cost-saving strategies, and exclusive Cloudways deals directly to your inbox.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>

          <NewsletterSignupForm />

          <p className="text-center text-sm text-muted-foreground mt-4">
            {t('newsletter.privacy') || 'No spam. Unsubscribe anytime. Your data is safe with us.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};