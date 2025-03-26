
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/providers/LanguageProvider';
import { supabase } from '@/integrations/supabase/client';

interface UserProfileBadgeProps {
  className?: string;
}

const UserProfileBadge: React.FC<UserProfileBadgeProps> = ({ className = "" }) => {
  const { t } = useLanguage();
  const [count, setCount] = useState(0);
  const [finalCount, setFinalCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    // Initial fetch of user count
    const fetchUserCount = async () => {
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      setFinalCount(userCount || 0);
    };

    fetchUserCount();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        async () => {
          // Refetch count when profiles table changes
          const { count: newCount } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });
          setFinalCount(newCount || 0);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Animation effect for counting
  useEffect(() => {
    const duration = 1500; // animation duration in ms
    const steps = 50; // number of steps in the animation
    const increment = Math.ceil(finalCount / steps);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= finalCount) {
        clearInterval(timer);
        setCount(finalCount);
      } else {
        setCount(current);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [finalCount]);
  
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
          <span ref={countRef} className="font-semibold">+{count.toLocaleString()}</span>{' '}
          <span>{t("registeredUsers")}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileBadge;

