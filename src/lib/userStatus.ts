
import { supabase } from '@/integrations/supabase/client';

export type UserStatus = 'online' | 'away' | 'busy' | 'invisible' | 'offline';

export interface UserPresence {
  status: UserStatus;
  lastSeen: number;
}

// Define the shape of the presence data we're tracking
interface PresenceState {
  user_id: string;
  status: UserStatus;
  lastSeen: number;
  presence_ref: string;
}

export const createOnlineUsersTracker = (userId: string) => {
  // Channel for realtime presence
  const channel = supabase.channel('online-users');
  
  // This will store the timeout ID for auto-away
  let activityTimeoutId: number | undefined;
  
  // Track browser visibility
  let isWindowVisible = !document.hidden;
  
  // Join the channel with initial status
  const joinChannel = (initialStatus: UserStatus = 'online') => {
    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await updatePresence(initialStatus);
      }
    });
  };
  
  // Update user presence
  const updatePresence = async (status: UserStatus) => {
    try {
      await channel.track({
        user_id: userId,
        status,
        lastSeen: new Date().getTime(),
      });
      console.log(`Updated user status to: ${status}`);
    } catch (error) {
      console.error('Error updating presence:', error);
    }
  };
  
  // Set up the automatic away status
  const setupAutoAway = () => {
    // Clear any existing timeout
    if (activityTimeoutId) {
      window.clearTimeout(activityTimeoutId);
    }
    
    // Set a timeout to automatically change status to away after 5 minutes of inactivity
    activityTimeoutId = window.setTimeout(() => {
      if (isWindowVisible) {
        updatePresence('away');
      }
    }, 5 * 60 * 1000); // 5 minutes
  };
  
  // Activity event listeners
  const setupActivityListeners = () => {
    const activityEvents = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    
    const handleActivity = () => {
      // Get current presence from state (if any)
      const presences = channel.presenceState() as Record<string, PresenceState[]>;
      const myCurrentPresence = presences[userId];
      
      // Only update if we're currently away and the window is visible
      if (isWindowVisible && myCurrentPresence && myCurrentPresence[0]?.status === 'away') {
        updatePresence('online');
      }
      
      // Reset auto-away timer
      setupAutoAway();
    };
    
    // Add event listeners
    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });
    
    // Handle window visibility changes
    document.addEventListener('visibilitychange', () => {
      isWindowVisible = !document.hidden;
      
      // If window becomes visible and we were away, set back to online
      if (isWindowVisible) {
        const presences = channel.presenceState() as Record<string, PresenceState[]>;
        const myCurrentPresence = presences[userId];
        
        if (myCurrentPresence && myCurrentPresence[0]?.status === 'away') {
          updatePresence('online');
        }
      } else {
        // If window is hidden, set to away
        updatePresence('away');
      }
    });
    
    // Setup auto-away initially
    setupAutoAway();
  };
  
  // Handle presence sync (when other users update their status)
  const setupPresenceSync = (callback: (users: Record<string, UserStatus>) => void) => {
    channel.on('presence', { event: 'sync' }, () => {
      const presences = channel.presenceState() as Record<string, PresenceState[]>;
      
      // Convert presences to a simpler format for the UI
      const users: Record<string, UserStatus> = {};
      
      Object.keys(presences).forEach(userId => {
        if (presences[userId] && presences[userId].length > 0) {
          // Take the most recent status
          users[userId] = presences[userId][0].status;
        }
      });
      
      callback(users);
    });
  };
  
  // Initialize and join the channel
  joinChannel();
  setupActivityListeners();
  
  return {
    // Subscribe to online users updates
    subscribe: (callback: (users: Record<string, UserStatus>) => void) => {
      setupPresenceSync(callback);
      return channel;
    },
    
    // Update user status manually
    updateStatus: async (status: UserStatus) => {
      await updatePresence(status);
    },
    
    // Unsubscribe and clean up
    unsubscribe: () => {
      if (activityTimeoutId) {
        window.clearTimeout(activityTimeoutId);
      }
      
      supabase.removeChannel(channel);
    }
  };
};
