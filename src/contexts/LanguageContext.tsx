
import React, { createContext, useContext, ReactNode } from 'react';
import { translations } from '@/data/translations';
import { useLanguageDetection, SupportedLanguage } from '@/hooks/useLanguageDetection';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  changeLanguage: (language: SupportedLanguage) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  console.log("=== LANGUAGE PROVIDER INITIALIZING ===");
  
  const { currentLanguage, changeLanguage } = useLanguageDetection();
  
  console.log("✅ Language Provider initialized with:", currentLanguage);

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
        // Fallback to English if translation not found
        let fallbackValue: any = translations.en;
        for (const fallbackKey of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fallbackKey in fallbackValue) {
            fallbackValue = fallbackValue[fallbackKey];
          } else {
            return key; // Return key if even English translation is missing
          }
        }
        return typeof fallbackValue === 'string' ? fallbackValue : key;
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
