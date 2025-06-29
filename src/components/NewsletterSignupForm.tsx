
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEmailSubscription } from '@/hooks/useEmailSubscription';
import { useLanguage } from '@/contexts/LanguageContext';

export const NewsletterSignupForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { subscribe, isSubscribing } = useEmailSubscription();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribe({ email, name: name || undefined, source: 'newsletter' });
      setEmail('');
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="email"
          placeholder={t('newsletter.emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Input
          type="text"
          placeholder={t('newsletter.namePlaceholder')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1"
        />
      </div>
      <Button 
        type="submit" 
        disabled={isSubscribing || !email}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
      >
        {isSubscribing ? t('newsletter.subscribing') : t('newsletter.subscribe')}
      </Button>
    </form>
  );
};
