
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'lv';
type TranslationValue = string | string[];
type Translations = Record<string, Record<Language, TranslationValue>>;

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
    lv: "Izveidot kontu"
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
    en: "Find reliable professionals and services. Easy!",
    lv: "Atrodi uzticamus profesionāļus un pakalpojumus. Vienkārši!"
  },
  "searchPlaceholder": {
    en: "what do you want to find, for example,",
    lv: "ko vēlies atrast, piemēram,"
  },
  // Random keywords for search
  "randomKeywords": {
    en: ["plumber", "electrician", "IT services", "lawyer", "accountant", "painter", "landscaper", "carpenter", "photographer", "designer", "mechanic", "dentist", "cleaning", "beauty salon", "translator"],
    lv: ["santehniķis", "elektriķis", "IT pakalpojumi", "jurists", "grāmatvedis", "krāsotājs", "dārznieks", "galdnieks", "fotogrāfs", "dizainers", "mehāniķis", "zobārsts", "tīrīšana", "skaistumkopšana", "tulkotājs"]
  },
  // User profile badge
  "registeredUsers": {
    en: "registered users",
    lv: "reģistrēti lietotāji"
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
    lv: "Nav atrasts neviens pakalpojuma sniedzējs"
  },
  "returningToHome": {
    en: "Returning to home page in 3 seconds...",
    lv: "Atgriežamies uz sākumlapu pēc 3 sekundēm..."
  },
  // Login/Signup pages
  "welcomeBack": {
    en: "Welcome Back",
    lv: "Ienākt sistēmā"
  },
  "signInToContinue": {
    en: "Sign in to continue to the Vendor Directory",
    lv: "Ienākt sistēmā"
  },
  "signInWithGoogle": {
    en: "Sign in with Google",
    lv: "Ielogoties ar Google"
  },
  "signInWithFacebook": {
    en: "Sign in with Facebook",
    lv: "Ielogoties ar Facebook"
  },
  "signInWithGithub": {
    en: "Sign in with GitHub",
    lv: "Ielogoties ar GitHub"
  },
  "signInWithX": {
    en: "Sign in with X",
    lv: "Ielogoties ar X"
  },
  "signUpWithGoogle": {
    en: "Sign up with Google",
    lv: "Reģistrēties ar Google"
  },
  "signUpWithFacebook": {
    en: "Sign up with Facebook",
    lv: "Reģistrēties ar Facebook"
  },
  "signUpWithGithub": {
    en: "Sign up with GitHub",
    lv: "Reģistrēties ar GitHub"
  },
  "signUpWithX": {
    en: "Sign up with X",
    lv: "Reģistrēties ar X"
  },
  "needVendorAccount": {
    en: "Want to join?",
    lv: "Vēlies reģistrēties?"
  },
  "signUpHere": {
    en: "Sign up here",
    lv: "Reģistrējieties šeit"
  },
  "byContinuing": {
    en: "By continuing, you agree to our",
    lv: "Turpinot, jūs piekrītat mūsu"
  },
  "termsOfService": {
    en: "Terms of Service",
    lv: "Pakalpojumu Sniegšanas Noteikumiem"
  },
  "and": {
    en: "and",
    lv: "un"
  },
  "privacyPolicy": {
    en: "Privacy Policy",
    lv: "Privātuma Politikai"
  },
  "pricing": {
    en: "Pricing",
    lv: "Cenas"
  },
  "createVendorAccount": {
    en: "Create Your Vendor Account",
    lv: "Izveidojiet Savu Sniedzēja Kontu"
  },
  "signUpPreferredSocial": {
    en: "Sign up with your preferred social account to get started",
    lv: "Reģistrējieties ar savu vēlamo sociālo kontu, lai sāktu"
  },
  "createAccount": {
    en: "Create an Account",
    lv: "Izveidot kontu"
  },
  "signUpMethod": {
    en: "Create your account",
    lv: "Izveidojiet savu kontu"
  },
  "createAccountInfo": {
    en: "Create an account to register your business in our directory. After signing up, you'll be able to complete your vendor profile.",
    lv: "Izveidojiet kontu, lai reģistrētu savu uzņēmumu mūsu katalogā. Pēc reģistrēšanās varēsiet aizpildīt sniedzēja profilu."
  },
  "alreadyHaveAccount": {
    en: "Already have an account?",
    lv: "Jau ir konts?"
  },
  "logIn": {
    en: "Log in",
    lv: "Ienākt"
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  getRandomKeyword: () => string;
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
    
    const translation = translations[key][language];
    
    // If translation is an array, return an error
    if (Array.isArray(translation)) {
      console.warn(`Translation for key "${key}" is an array, but a string was expected.`);
      return key;
    }
    
    return translation as string || key;
  };
  
  // Function to get a random keyword based on current language
  const getRandomKeyword = (): string => {
    const keywords = translations.randomKeywords[language] as string[];
    return keywords[Math.floor(Math.random() * keywords.length)];
  };
  
  // Update document language attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getRandomKeyword }}>
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
