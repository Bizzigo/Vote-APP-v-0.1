
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export type StatusType = 'online' | 'offline' | 'away' | 'busy' | 'invisible';

interface AvatarWithStatusProps {
  src?: string;
  fallback: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: StatusType;
  className?: string;
}

const statusColors: Record<StatusType, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
  invisible: 'bg-transparent border-2 border-gray-400'
};

export const AvatarWithStatus: React.FC<AvatarWithStatusProps> = ({
  src,
  fallback,
  alt,
  size = 'md',
  status,
  className
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };
  
  const statusSizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-3.5 w-3.5',
    xl: 'h-4 w-4'
  };

  return (
    <div className="relative inline-block">
      <Avatar className={cn(sizeClasses[size], className)}>
        {src ? (
          <AvatarImage src={src} alt={alt || fallback} />
        ) : (
          <AvatarFallback className="bg-primary/10 text-primary">
            {fallback}
          </AvatarFallback>
        )}
      </Avatar>
      
      {status && (
        <span 
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-card",
            statusColors[status],
            statusSizeClasses[size]
          )}
        />
      )}
    </div>
  );
};
