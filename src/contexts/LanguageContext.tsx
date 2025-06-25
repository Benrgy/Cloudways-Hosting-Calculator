
import React, { createContext, useContext, ReactNode, useState } from 'react';

export type SupportedLanguage = 'en' | 'nl' | 'de' | 'fr' | 'es';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  changeLanguage: (language: SupportedLanguage) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  console.log("=== LANGUAGE PROVIDER INITIALIZING ===");
  
  // Simplified language detection - just use English for now
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  
  console.log("✅ Language Provider initialized with:", currentLanguage);

  const changeLanguage = (language: SupportedLanguage) => {
    console.log("Changing language to:", language);
    setCurrentLanguage(language);
  };

  // Simplified translation function - just return the key for now
  const t = (key: string): string => {
    console.log("Translation requested for:", key);
    return key;
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
