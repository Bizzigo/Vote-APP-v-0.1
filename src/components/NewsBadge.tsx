
import React, { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/providers/LanguageProvider';

interface NewsItem {
  title: string;
  link: string;
  pubDate?: string;
}

const NewsBadge: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // Since we can't directly fetch the RSS due to CORS, we'll use a proxy
        // In a production environment, you'd implement a server-side proxy or use a dedicated RSS service
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const encodedUrl = encodeURIComponent('http://www.db.lv/rss/?type=1');
        const response = await fetch(`${proxyUrl}${encodedUrl}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const items = xmlDoc.querySelectorAll('item');
        
        const newsItems: NewsItem[] = Array.from(items).slice(0, 5).map(item => ({
          title: item.querySelector('title')?.textContent || 'No title',
          link: item.querySelector('link')?.textContent || '#',
          pubDate: item.querySelector('pubDate')?.textContent || undefined
        }));
        
        setNews(newsItems);
      } catch (err) {
        console.error('News fetch error:', err);
        setError('Could not load news data');
        
        // Fallback with some sample data for demonstration purposes
        setNews([
          { title: 'Latest economic news from Latvia', link: '#' },
          { title: 'Business development in Baltic region', link: '#' },
          { title: 'New investments in technology sector', link: '#' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    
    // Refresh news every 30 minutes
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-4 w-full">
      <div className="flex items-center gap-2 mb-2">
        <Newspaper className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">{t("latestNews") || "Latest News"}</h3>
      </div>
      
      {loading && (
        <div className="flex justify-center py-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      )}
      
      {error && !news.length && (
        <div className="text-sm text-destructive text-center py-1">
          {error}
        </div>
      )}
      
      <div className="text-sm space-y-1.5">
        {news.map((item, index) => (
          <div key={index} className="flex items-start gap-1 truncate">
            <span className="text-primary font-bold mr-1">•</span>
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="truncate hover:text-primary transition-colors flex-1"
              title={item.title}
            >
              {item.title}
            </a>
          </div>
        ))}
      </div>
      
      <div className="mt-2 text-xs text-right">
        <a 
          href="http://www.db.lv/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <span>db.lv</span>
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
    </Card>
  );
};

export default NewsBadge;
