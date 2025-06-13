
import { useState, useEffect } from 'react';

export type SupportedLanguage = 'en' | 'nl' | 'de' | 'fr' | 'es';

export const useLanguageDetection = () => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    const detectLanguage = (): SupportedLanguage => {
      // Check URL parameters first
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang') as SupportedLanguage;
      if (langParam && ['en', 'nl', 'de', 'fr', 'es'].includes(langParam)) {
        return langParam;
      }

      // Check localStorage
      const savedLang = localStorage.getItem('preferredLanguage') as SupportedLanguage;
      if (savedLang && ['en', 'nl', 'de', 'fr', 'es'].includes(savedLang)) {
        return savedLang;
      }

      // Detect from browser language
      const browserLang = navigator.language.toLowerCase();
      
      if (browserLang.startsWith('nl')) return 'nl';
      if (browserLang.startsWith('de')) return 'de';
      if (browserLang.startsWith('fr')) return 'fr';
      if (browserLang.startsWith('es')) return 'es';
      
      return 'en'; // Default fallback
    };

    const detectedLanguage = detectLanguage();
    setCurrentLanguage(detectedLanguage);
    localStorage.setItem('preferredLanguage', detectedLanguage);
  }, []);

  const changeLanguage = (language: SupportedLanguage) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  return { currentLanguage, changeLanguage };
};
