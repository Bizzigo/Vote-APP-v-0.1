
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/translations';
import { Language } from '@/translations/types';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize with browser language or default to English
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    return browserLang === 'lv' ? 'lv' : 'en';
  };
  
  // Check local storage first, then browser language
  const getInitialLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || getBrowserLanguage();
  };
  
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  
  // Set language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };
  
  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || key;
  };
  
  // Update document language attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
