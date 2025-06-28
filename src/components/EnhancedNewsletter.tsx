
import React from 'react';
import { NewsletterSignupForm } from '@/components/NewsletterSignupForm';
import { useLanguage } from '@/contexts/LanguageContext';

export const EnhancedNewsletter = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-emerald-600">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('newsletter.title') || 'Stay Updated'}
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            {t('newsletter.subtitle') || 'Get the latest hosting deals and optimization tips delivered to your inbox.'}
          </p>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <NewsletterSignupForm />
          </div>
          
          <p className="text-emerald-100 text-sm mt-4">
            {t('newsletter.privacy') || 'We respect your privacy. Unsubscribe at any time.'}
          </p>
        </div>
      </div>
    </section>
  );
};
