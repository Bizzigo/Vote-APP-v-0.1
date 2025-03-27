
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/providers/LanguageProvider';

interface NoSearchResultsProps {
  searchTerm: string;
}

const NoSearchResults: React.FC<NoSearchResultsProps> = ({ searchTerm }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  // Add navigation effect without countdown display
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to home page
      navigate('/', { replace: true });
    }, 2000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="py-4">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          {language === 'lv' 
            ? `Nav šāda informācija mūsu datu bāzē. Mēģiniet savādāk...` 
            : `No such information in our database. Try differently...`}
        </p>
      </div>
    </div>
  );
};

export default NoSearchResults;
