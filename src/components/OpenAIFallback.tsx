
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
          ],
          en: [
            "Hmm, I don't have any witty responses about \"" + searchTerm + "\" right now. Try searching for something else!",
            "\"" + searchTerm + "\"? Sounds interesting, but I don't have any info on that at the moment.",
            "I'd love to help with \"" + searchTerm + "\", but I can't find anything on it. Maybe try a different search term?",
            "My humor circuits seem to be a bit empty at the moment. Try searching for something else!",
          ]
        };
        
        // Select a random fallback response for immediate display
        const randomIndex = Math.floor(Math.random() * fallbackResponses[language].length);
        const fallbackMessage = fallbackResponses[language][randomIndex];
        
        // Set fallback message immediately
        setResponse(fallbackMessage);
        
        // Determine system message language
        const systemMessage = language === 'lv' 
          ? 'Tu esi asprātīgs asistents. Atbildi ar jautrām un vieglām ziņām sarunvalodas stilā. Turi atbildes īsākas par 100 vārdiem. Nesāc ar frāzēm "Man žēl" vai "Diemžēl".'
          : 'You are a humorous assistant. Respond with funny and light-hearted messages in a conversational tone. Keep responses under 100 words. Do not start with phrases like "I\'m sorry" or "Unfortunately".';
        
        // Determine user prompt language
        const userPrompt = language === 'lv'
          ? `Es meklēju "${searchTerm}", bet nevarēju atrast nekādus rezultātus. Vai vari pateikt kaut ko jautru vai interesantu par to?`
          : `I searched for "${searchTerm}" but couldn't find any results. Can you say something funny or interesting about this?`;
        
        // Make the API call to OpenAI
        try {
          console.log("Attempting to call OpenAI API...");
          
          const apiKey = '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';
          
          const result = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
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
          
          console.log("API response status:", result.status);
          
          if (!result.ok) {
            const errorText = await result.text();
            console.error("OpenAI API error:", errorText);
            throw new Error(`API returned status ${result.status}: ${errorText}`);
          }
          
          const data = await result.json();
          console.log("API response data:", data);
          
          if (data.choices && data.choices[0] && data.choices[0].message) {
            setResponse(data.choices[0].message.content);
          } else if (data.error) {
            console.error("OpenAI API error response:", data.error);
            // Keep the fallback message already set
          }
        } catch (apiError) {
          console.error("Error fetching from OpenAI API:", apiError);
          // API failed, but we already have a fallback message displayed
        }
      } catch (error) {
        console.error("General error in OpenAIFallback:", error);
        // If all else fails, ensure we have a response
        setResponse(language === 'lv'
          ? "Mana humora shēma šobrīd ir nedaudz sajukusi. Varbūt pamēģini meklēt kaut ko citu?"
          : "My humor circuits are a bit frazzled right now. Maybe try searching for something else?");
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
            Powered by OpenAI
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenAIFallback;
