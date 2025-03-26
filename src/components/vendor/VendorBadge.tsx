
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface VendorBadgeProps {
  icon?: React.ReactNode;
  label: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
  href?: string;
  onClick?: () => void;
  scrollToId?: string;
}

const VendorBadge: React.FC<VendorBadgeProps> = ({
  icon,
  label,
  variant = "secondary",
  className = "",
  href,
  onClick,
  scrollToId
}) => {
  const handleClick = () => {
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    
    if (onClick) {
      onClick();
    }
  };

  const BadgeContent = () => (
    <Badge 
      variant={variant} 
      className={`flex items-center gap-1 text-xs rounded-md px-2 py-1 whitespace-nowrap transition-colors ${className} ${(scrollToId || onClick) ? 'cursor-pointer hover:bg-primary/10' : ''}`}
      onClick={handleClick}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Badge>
  );

  if (href) {
    return (
      <a href={href} className="hover:opacity-90 transition-opacity" target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined}>
        <BadgeContent />
      </a>
    );
  }

  return <BadgeContent />;
};

export default VendorBadge;
