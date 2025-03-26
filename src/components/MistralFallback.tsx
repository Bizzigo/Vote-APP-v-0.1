
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
  const { t } = useLanguage();

  useEffect(() => {
    const generateFunResponse = async () => {
      try {
        setIsLoading(true);
        
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
                content: 'You are a humorous assistant. Respond with funny and light-hearted messages in a conversational tone. Keep responses under 100 words. Do not start with phrases like "I\'m sorry" or "Unfortunately".'
              },
              {
                role: 'user',
                content: `I searched for "${searchTerm}" but couldn't find any results. Can you say something funny or interesting about this?`
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
          setResponse("Hmm, I seem to be out of witty responses at the moment. Maybe try searching for something else?");
        }
      } catch (error) {
        console.error("Error fetching from Mistral API:", error);
        setResponse("My humor circuits are a bit frazzled right now. Maybe try searching for something else?");
        toast({
          title: t("Error"),
          description: "Could not generate a fun response",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      generateFunResponse();
    }
  }, [searchTerm, toast, t]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900 my-4">
      <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">AI Thoughts</h3>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          <span className="ml-2 text-muted-foreground">Thinking of something clever...</span>
        </div>
      ) : (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-muted-foreground">{response}</p>
        </div>
      )}
      
      <div className="text-xs text-right mt-4 text-muted-foreground">
        Powered by Mistral AI
      </div>
    </div>
  );
};

export default MistralFallback;
