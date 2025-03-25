
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PreviewLinkProps {
  url?: string;
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const PreviewLink: React.FC<PreviewLinkProps> = ({ 
  url = "https://preview--candid-cast-collection.lovable.app/", 
  children, 
  variant = "default",
  size = "default",
  className = ""
}) => {
  const { toast } = useToast();
  
  const handleOpenPreview = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Try to open in a new window
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    
    // Check if popup was blocked
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      toast({
        title: "Popup Blocked",
        description: "Please allow popups for this site to open the preview",
        variant: "destructive",
      });
      
      // Fallback - update the href attribute and try again
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={`flex items-center gap-2 ${className}`}
      onClick={handleOpenPreview}
    >
      {children}
      <ExternalLink className="h-4 w-4" />
    </Button>
  );
};

export default PreviewLink;
