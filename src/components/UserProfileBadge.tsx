
import React from 'react';
import { useLanguage } from '@/providers/LanguageProvider';

interface UserProfileBadgeProps {
  className?: string;
}

const UserProfileBadge: React.FC<UserProfileBadgeProps> = ({ className = "" }) => {
  const { t } = useLanguage();
  
  // This would normally be fetched from an API
  const registeredUserCount = 1248;
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center">
        <div className="flex -space-x-3 overflow-hidden mr-3">
          <img 
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-foreground" 
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="User avatar"
          />
          <img 
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-foreground" 
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="User avatar"
          />
          <img 
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-foreground" 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" 
            alt="User avatar"
          />
          <img 
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-foreground" 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="User avatar"
          />
          <img 
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-foreground" 
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="User avatar"
          />
          <img 
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-foreground" 
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="User avatar"
          />
        </div>
        <div className="text-sm text-foreground/80">
          <span className="font-semibold">{registeredUserCount.toLocaleString()}</span> {t("registeredUsers")}
        </div>
      </div>
    </div>
  );
};

export default UserProfileBadge;
