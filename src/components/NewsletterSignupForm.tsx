import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEmailSubscription } from '@/hooks/useEmailSubscription';
import { useLanguage } from '@/contexts/LanguageContext';
export const NewsletterSignupForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const {
    subscribe,
    isSubscribing
  } = useEmailSubscription();
  const {
    t
  } = useLanguage();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribe({
        email,
        name: name || undefined,
        source: 'newsletter'
      });
      setEmail('');
      setName('');
    }
  };
  return;
};