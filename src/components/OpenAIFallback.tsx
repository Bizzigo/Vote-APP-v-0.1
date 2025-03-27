
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/providers/LanguageProvider';

interface OpenAIFallbackProps {
  searchTerm: string;
}

const OpenAIFallback: React.FC<OpenAIFallbackProps> = ({ searchTerm }) => {
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  useEffect(() => {
    const generateFunResponse = async () => {
      try {
        setIsLoading(true);
        
        // Create default fallback responses based on language
        const fallbackResponses = {
          lv: [
            "Hmm, par \"" + searchTerm + "\" man nav nekādas asprātīgas atbildes. Mēģini meklēt ko citu!",
            "\"" + searchTerm + "\"? Tas izklausās interesanti, bet šobrīd man par to nav nekādas informācijas.",
            "Man ļoti žēl, bet es nevaru atrast informāciju par \"" + searchTerm + "\". Varbūt izmēģini citu meklēšanas terminu?",
            "Mana humora shēma šobrīd ir nedaudz iztukšojusies. Pamēģini meklēt kaut ko citu!",
            "Par \"" + searchTerm + "\" mums pagaidām nav informācijas. Bet mēs strādājam, lai to uzlabotu!",
            "\"" + searchTerm + "\" - interesants meklējums! Diemžēl šobrīd nav atbilstošu rezultātu.",
            "Meklējot \"" + searchTerm + "\" pēc mūsu datiem nekas netika atrasts, mēģini citu atslēgvārdu.",
          ],
          en: [
            "Hmm, I don't have any witty responses about \"" + searchTerm + "\" right now. Try searching for something else!",
            "\"" + searchTerm + "\"? Sounds interesting, but I don't have any info on that at the moment.",
            "I'd love to help with \"" + searchTerm + "\", but I can't find anything on it. Maybe try a different search term?",
            "My humor circuits seem to be a bit empty at the moment. Try searching for something else!",
            "We don't have any information about \"" + searchTerm + "\" yet. But we're working on improving!",
            "\"" + searchTerm + "\" - interesting search! Unfortunately, there are no matching results right now.",
            "Looking for \"" + searchTerm + "\" didn't return any results in our database, try another keyword.",
          ]
        };
        
        // Select a random fallback response
        const randomIndex = Math.floor(Math.random() * fallbackResponses[language].length);
        const fallbackMessage = fallbackResponses[language][randomIndex];
        
        // Set fallback message
        setResponse(fallbackMessage);
        
        // Make sure to eventually stop loading
        setIsLoading(false);
      } catch (error) {
        console.error("Error in OpenAIFallback:", error);
        // If all else fails, ensure we have a response
        setResponse(language === 'lv'
          ? "Mana humora shēma šobrīd ir nedaudz sajukusi. Varbūt pamēģini meklēt kaut ko citu?"
          : "My humor circuits are a bit frazzled right now. Maybe try searching for something else?");
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      generateFunResponse();
    }
  }, [searchTerm, toast, t, language]);

  return (
    <div className="py-4">
      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          <span className="ml-2 text-muted-foreground">
            {language === 'lv' ? "Domāju par kaut ko asprātīgu..." : "Thinking of something clever..."}
          </span>
        </div>
      ) : (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-muted-foreground">{response}</p>
        </div>
      )}
    </div>
  );
};

export default OpenAIFallback;
