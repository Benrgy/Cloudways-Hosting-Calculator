
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { translations } from '@/data/translations';

export type SupportedLanguage = 'en' | 'nl' | 'de' | 'fr' | 'es';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  changeLanguage: (language: SupportedLanguage) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  console.log("=== LANGUAGE PROVIDER INITIALIZING ===");
  
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    const detectLanguage = (): SupportedLanguage => {
      // Check URL parameters first
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang') as SupportedLanguage;
      if (langParam && ['en', 'nl', 'de', 'fr', 'es'].includes(langParam)) {
        localStorage.setItem('preferredLanguage', langParam);
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
    console.log("✅ Language Provider initialized with:", detectedLanguage);
  }, []);

  const changeLanguage = (language: SupportedLanguage) => {
    console.log("🔄 Changing language from", currentLanguage, "to", language);
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
    
    // Update URL parameter
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.history.replaceState({}, '', url.toString());
  };

  const t = (key: string): string => {
    console.log("🔍 Translation requested for:", key, "in language:", currentLanguage);
    
    // Navigate through the translation object using the key path
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`⚠️ Translation missing for key: ${key} in language: ${currentLanguage}`);
        // Fallback to English if translation not found
        let fallbackValue: any = translations.en;
        for (const fallbackKey of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fallbackKey in fallbackValue) {
            fallbackValue = fallbackValue[fallbackKey];
          } else {
            console.error(`❌ Translation missing even in English for: ${key}`);
            return key; // Return key if even English translation is missing
          }
        }
        return typeof fallbackValue === 'string' ? fallbackValue : key;
      }
    }
    
    const result = typeof value === 'string' ? value : key;
    console.log("✅ Translation found:", result);
    return result;
  };

  try {
    return (
      <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
        {children}
      </LanguageContext.Provider>
    );
  } catch (error) {
    console.error("❌ Error in LanguageProvider:", error);
    return (
      <div style={{ padding: '20px', color: 'red', background: '#fff' }}>
        <h2>Language Provider Error</h2>
        <p>{error instanceof Error ? error.message : 'Unknown error occurred'}</p>
        <p>Please refresh the page to continue.</p>
      </div>
    );
  }
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
