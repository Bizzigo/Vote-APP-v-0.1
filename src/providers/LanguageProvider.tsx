
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'lv';
type Translations = Record<string, Record<Language, string>>;

// Translations dictionary
export const translations: Translations = {
  // Navbar
  "profile": {
    en: "Profile",
    lv: "Profils"
  },
  "logout": {
    en: "Log Out",
    lv: "Iziet"
  },
  "login": {
    en: "Log In",
    lv: "Ienākt"
  },
  "signup": {
    en: "Sign Up",
    lv: "Reģistrēties"
  },
  "lightMode": {
    en: "Light Mode",
    lv: "Gaišais režīms"
  },
  "darkMode": {
    en: "Dark Mode",
    lv: "Tumšais režīms"
  },
  // Home page
  "heroText": {
    en: "Find trusted and professional service providers. YES, find yours!",
    lv: "Te ir uzticami un profesionāli pakalpojumu sniedzēji. JĀ, atrodi savu!"
  },
  "searchPlaceholder": {
    en: "Search for local businesses...",
    lv: "Meklēt vietējos uzņēmumus..."
  },
  // Search results
  "searchResults": {
    en: "Search Results",
    lv: "Meklēšanas rezultāti"
  },
  "noVendorsFound": {
    en: "No vendors found. Try adjusting your search.",
    lv: "Nav atrasts neviens pakalpojuma sniedzējs. Pamēģiniet pielāgot meklēšanu."
  },
  "distanceEnabled": {
    en: "Location enabled",
    lv: "Atrašanās vieta iespējota"
  },
  "distance": {
    en: "Distance",
    lv: "Attālums"
  },
  // Common
  "km": {
    en: "km",
    lv: "km"
  },
  // Toast message
  "noVendorsFoundTitle": {
    en: "No vendors found",
    lv: "Nav atrasts neviens pakalpojumu sniedzējs"
  },
  "returningToHome": {
    en: "Returning to home page in 3 seconds...",
    lv: "Atgriežamies uz sākumlapu pēc 3 sekundēm..."
  }
};

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
