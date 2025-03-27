
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/providers/LanguageProvider';

interface NoSearchResultsProps {
  searchTerm: string;
}

const NoSearchResults: React.FC<NoSearchResultsProps> = ({ searchTerm }) => {
  const [countdown, setCountdown] = useState<number>(3);
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  // Add countdown and navigation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Navigate to home page
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [navigate]);

  return (
    <div className="py-4">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          {language === 'lv' 
            ? `Nevarēja atrast neko par "${searchTerm}". Mēģiniet citu meklēšanas vārdu.` 
            : `Couldn't find anything about "${searchTerm}". Try a different search term.`}
        </p>
        <div className="flex flex-col items-center mt-4">
          <p className="text-sm text-muted-foreground">
            {language === 'lv' 
              ? `Atgriežamies sākumlapā pēc ${countdown} sekundēm...` 
              : `Returning to home page in ${countdown} seconds...`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoSearchResults;
