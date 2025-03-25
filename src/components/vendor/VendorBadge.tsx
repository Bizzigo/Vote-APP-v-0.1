
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
}

const VendorBadge: React.FC<VendorBadgeProps> = ({
  icon,
  label,
  variant = "secondary",
  className = "",
  href,
  onClick
}) => {
  const BadgeContent = () => (
    <Badge 
      variant={variant} 
      className={`flex items-center gap-1 text-xs rounded-sm px-2 py-0.5 ${className}`}
      onClick={onClick}
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
