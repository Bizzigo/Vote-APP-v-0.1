
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
    const generateOpenAIResponse = async () => {
      try {
        setIsLoading(true);

        // OpenAI API key
        const apiKey = "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";

        // Create a prompt based on the search term and language
        const promptText = language === 'lv' 
          ? `Lietotājs meklēja "${searchTerm}" bet nekas netika atrasts. Lūdzu, uzraksti īsu, draudzīgu un cilvēcīgu atbildi (1-2 teikumus) latviešu valodā, kas informē, ka nekas netika atrasts. Atbilde var būt ar humora pieskaņu, bet jābūt pieklājīgai un laipnai. Svarīgi: Atbildē nav jāpiemin OpenAI vai AI, vai cits AI modelis.`
          : `The user searched for "${searchTerm}" but nothing was found. Please write a short, friendly and human-like response (1-2 sentences) in English, informing that nothing was found. The response can have a touch of humor but should be polite and kind. Important: The response should not mention OpenAI or AI, or any other AI model.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'user', content: promptText }
            ],
            max_tokens: 150,
            temperature: 0.7
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('OpenAI API error:', errorData);
          throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content.trim();
        
        setResponse(aiResponse);
        setIsLoading(false);
      } catch (error) {
        console.error("Error generating OpenAI response:", error);
        
        // Fallback responses if API call fails
        const fallbackResponses = {
          lv: [
            "Hmm, par \"" + searchTerm + "\" šobrīd nav nekādas informācijas. Pamēģini meklēt ko citu!",
            "\"" + searchTerm + "\"? Interesanti, bet diemžēl mums par to nav nekādas informācijas.",
            "Par \"" + searchTerm + "\" mums pagaidām nav informācijas. Varbūt mēģini citu meklēšanas terminu?",
            "Meklējot \"" + searchTerm + "\" pēc mūsu datiem nekas netika atrasts. Mēs turpinām pilnveidot mūsu datubāzi!"
          ],
          en: [
            "Hmm, I couldn't find anything about \"" + searchTerm + "\" right now. Try searching for something else!",
            "\"" + searchTerm + "\"? Sounds interesting, but unfortunately we don't have any info on that at the moment.",
            "I'd love to help with \"" + searchTerm + "\", but I couldn't find anything on it. Maybe try a different search term?",
            "Looking for \"" + searchTerm + "\" didn't return any results in our database. We're continuously improving our search capabilities!"
          ]
        };
        
        // Select a random fallback response
        const randomIndex = Math.floor(Math.random() * fallbackResponses[language].length);
        const fallbackMessage = fallbackResponses[language][randomIndex];
        
        setResponse(fallbackMessage);
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      generateOpenAIResponse();
    }
  }, [searchTerm, toast, t, language]);

  return (
    <div className="py-4">
      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          <span className="ml-2 text-muted-foreground">
            {language === 'lv' ? "Meklēju citas iespējas..." : "Looking for alternatives..."}
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
