
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
      className={`flex items-center gap-1 text-xs rounded-sm px-2 py-0.5 ${className} ${(scrollToId || onClick) ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      {icon}
      {label}
    </Badge>
  );

  if (href) {
    return (
      <a href={href} className="hover:opacity-80" target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined}>
        <BadgeContent />
      </a>
    );
  }

  return <BadgeContent />;
};

export default VendorBadge;
