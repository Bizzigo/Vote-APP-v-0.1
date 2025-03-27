
import { useEffect, useState } from 'react';
import { User } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';

// Define status types
export type UserStatus = 'online' | 'offline' | 'away' | 'busy' | 'invisible';

// Function to get user status from Supabase presence
export const getUserStatus = async (userId: string): Promise<UserStatus> => {
  try {
    // Create a temporary channel to check this user's presence state
    const channel = supabase.channel(`presence-${userId}`);
    const state = channel.presenceState();
    
    // Check if user has an active presence
    const userPresence = Object.keys(state).find(key => key === userId);
    if (!userPresence) return 'offline';
    
    // If user exists in presence state, get their status
    const presenceData = state[userId];
    if (!presenceData || !presenceData.length) return 'offline';
    
    return (presenceData[0] as any).status || 'online';
  } catch (error) {
    console.error('Error getting user status:', error);
    return 'offline';
  }
};

// React hook to track a user's status
export const useUserStatus = (user: User | null): UserStatus => {
  const [status, setStatus] = useState<UserStatus>(user ? 'online' : 'offline');
  
  useEffect(() => {
    if (!user) {
      setStatus('offline');
      return;
    }
    
    // Subscribe to user's presence channel
    const channel = supabase.channel('online-users')
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const isUserOnline = Object.keys(state).some(key => key === user.id);
        
        if (isUserOnline) {
          const userPresence = state[user.id];
          if (userPresence && userPresence.length > 0) {
            setStatus((userPresence[0] as any).status || 'online');
          }
        } else {
          setStatus('offline');
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Set initial status to online when subscribing
          await channel.track({
            id: user.id,
            status: 'online',
            lastActive: new Date().toISOString()
          });
        }
      });
    
    // Handle window visibility changes to update status
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        channel.track({
          id: user.id,
          status: 'online',
          lastActive: new Date().toISOString()
        });
      } else {
        channel.track({
          id: user.id,
          status: 'away',
          lastActive: new Date().toISOString()
        });
      }
    };
    
    // Handle user inactivity
    let inactivityTimer: ReturnType<typeof setTimeout>;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        channel.track({
          id: user.id,
          status: 'away',
          lastActive: new Date().toISOString()
        });
      }, 5 * 60 * 1000); // 5 minutes of inactivity
    };
    
    // Setup event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    resetInactivityTimer();
    
    return () => {
      // Clean up
      supabase.removeChannel(channel);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mousemove', resetInactivityTimer);
      document.removeEventListener('keypress', resetInactivityTimer);
      clearTimeout(inactivityTimer);
    };
  }, [user]);
  
  return status;
};

// Create a new context to track all online users
export const createOnlineUsersTracker = (userId: string) => {
  const channel = supabase.channel('online-users');
  
  return {
    subscribe: async (callback: (users: Record<string, UserStatus>) => void) => {
      channel
        .on('presence', { event: 'sync' }, () => {
          const state = channel.presenceState();
          const onlineUsers: Record<string, UserStatus> = {};
          
          // Convert presence state to a simple map of user IDs to statuses
          Object.keys(state).forEach(key => {
            const presenceData = state[key];
            if (presenceData && presenceData.length > 0) {
              onlineUsers[key] = (presenceData[0] as any).status || 'online';
            }
          });
          
          callback(onlineUsers);
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            // When subscribed, track this user's status
            await channel.track({
              id: userId,
              status: 'online',
              lastActive: new Date().toISOString()
            });
          }
        });
        
      return channel;
    },
    updateStatus: async (status: UserStatus) => {
      return channel.track({
        id: userId,
        status,
        lastActive: new Date().toISOString()
      });
    },
    unsubscribe: () => {
      supabase.removeChannel(channel);
    }
  };
};
