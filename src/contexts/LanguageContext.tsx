
import React, { createContext, useContext, ReactNode, useState } from 'react';
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
  
  console.log("✅ Language Provider initialized with:", currentLanguage);

  const changeLanguage = (language: SupportedLanguage) => {
    console.log("Changing language to:", language);
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    console.log("Translation requested for:", key);
    
    // Navigate through the translation object using the key path
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation missing for key: ${key} in language: ${currentLanguage}`);
        return key; // Fallback to key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
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
      <div style={{ padding: '20px', color: 'red' }}>
        Language Provider Error: {error.message}
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
