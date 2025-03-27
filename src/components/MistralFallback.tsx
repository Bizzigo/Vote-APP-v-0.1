
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/providers/LanguageProvider';

interface MistralFallbackProps {
  searchTerm: string;
}

const MistralFallback: React.FC<MistralFallbackProps> = ({ searchTerm }) => {
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  useEffect(() => {
    const generateFunResponse = async () => {
      try {
        setIsLoading(true);
        
        // Determine system message language
        const systemMessage = language === 'lv' 
          ? 'Tu esi asprātīgs asistents. Atbildi ar jautrām un vieglām ziņām sarunvalodas stilā. Turi atbildes īsākas par 100 vārdiem. Nesāc ar frāzēm "Man žēl" vai "Diemžēl".'
          : 'You are a humorous assistant. Respond with funny and light-hearted messages in a conversational tone. Keep responses under 100 words. Do not start with phrases like "I\'m sorry" or "Unfortunately".';
        
        // Determine user prompt language
        const userPrompt = language === 'lv'
          ? `Es meklēju "${searchTerm}", bet nevarēju atrast nekādus rezultātus. Vai vari pateikt kaut ko jautru vai interesantu par to?`
          : `I searched for "${searchTerm}" but couldn't find any results. Can you say something funny or interesting about this?`;
        
        const result = await fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer hAsLK8ee2wXjsh4WDBCxXoMHT42qiP7n`
          },
          body: JSON.stringify({
            model: 'mistral-tiny',
            messages: [
              {
                role: 'system',
                content: systemMessage
              },
              {
                role: 'user',
                content: userPrompt
              }
            ],
            temperature: 0.7,
            max_tokens: 150
          })
        });
        
        const data = await result.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
          setResponse(data.choices[0].message.content);
        } else {
          setResponse(language === 'lv' 
            ? "Hmm, šķiet, ka man pašlaik nav asprātīgu atbilžu. Varbūt pamēģini meklēt kaut ko citu?" 
            : "Hmm, I seem to be out of witty responses at the moment. Maybe try searching for something else?");
        }
      } catch (error) {
        console.error("Error fetching from Mistral API:", error);
        setResponse(language === 'lv'
          ? "Mana humora shēma šobrīd ir nedaudz sajukusi. Varbūt pamēģini meklēt kaut ko citu?"
          : "My humor circuits are a bit frazzled right now. Maybe try searching for something else?");
        toast({
          title: t("Error"),
          description: language === 'lv' ? "Nevarēja ģenerēt jautru atbildi" : "Could not generate a fun response",
          variant: "destructive",
        });
      } finally {
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
          <div className="text-xs text-right mt-4 text-muted-foreground">
            Powered by Mistral AI
          </div>
        </div>
      )}
    </div>
  );
};

export default MistralFallback;
