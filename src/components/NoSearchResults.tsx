
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
        `We couldn't find any matches for "${searchTerm}". We're adding new vendors daily!`,
        `No results for "${searchTerm}" yet. Try different keywords or check back soon!`,
        `Nothing found for "${searchTerm}". We're expanding our database every day.`,
        `Sorry, no vendors match "${searchTerm}" at the moment. Try another search term?`
      ],
      lv: [
        `Nevarējām atrast rezultātus meklējumam "${searchTerm}". Mēs katru dienu pievienojam jaunus pakalpojumus!`,
        `Pagaidām nav rezultātu meklējumam "${searchTerm}". Pamēģiniet citus atslēgvārdus!`,
        `Nekas netika atrasts meklējumam "${searchTerm}". Mēs katru dienu papildinām mūsu datubāzi.`,
        `Diemžēl šobrīd nav pakalpojumu sniedzēju, kas atbilst "${searchTerm}". Pamēģiniet citu meklēšanas terminu?`
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
    <div className="typewriter text-sm text-muted-foreground mb-3 mx-auto py-1 px-4 bg-background/50 border border-muted rounded-md shadow-sm">
      {displayText}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default NoSearchResults;
