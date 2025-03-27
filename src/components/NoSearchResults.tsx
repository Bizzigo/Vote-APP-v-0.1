
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/providers/LanguageProvider';

interface NoSearchResultsProps {
  searchTerm: string;
}

const NoSearchResults: React.FC<NoSearchResultsProps> = ({ searchTerm }) => {
  const { language } = useLanguage();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get message based on language
  const getMessage = () => {
    const messages = {
      en: [
        `No results for "${searchTerm}" yet. We're adding new vendors daily! Try again...`,
        `Nothing found for "${searchTerm}". Check back soon! Try again...`,
        `No matches for "${searchTerm}". We're growing every day! Try again...`,
        `Can't find "${searchTerm}" yet. Keep checking! Try again...`
      ],
      lv: [
        `Nav rezultātu "${searchTerm}". Drīz būs jauni piedāvājumi! Mēģiniet vēl...`,
        `Nekas nav atrasts "${searchTerm}". Drīz būs! Mēģiniet vēl...`,
        `Nav atrasts "${searchTerm}". Mēs augam katru dienu! Mēģiniet vēl...`,
        `Pagaidām nav "${searchTerm}". Mēģiniet vēlreiz! Mēģiniet vēl...`
      ]
    };
    
    // Get random message
    const messagesArray = messages[language as keyof typeof messages] || messages.en;
    const randomIndex = Math.floor(Math.random() * messagesArray.length);
    return messagesArray[randomIndex];
  };
  
  // Typewriter effect
  useEffect(() => {
    const fullText = getMessage();
    
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 25); // Speed of typewriter effect
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, searchTerm, language]);
  
  // Reset typewriter when search term changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [searchTerm]);
  
  return (
    <div className="typewriter text-sm text-muted-foreground mb-3 py-1 px-4 bg-background/50 border border-muted rounded-md shadow-sm w-full max-w-full overflow-visible">
      {displayText}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default NoSearchResults;
