
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserStatus, createOnlineUsersTracker } from '@/lib/userStatus';
import { useAuth } from '@/hooks/useAuth';

interface OnlineUsersContextType {
  onlineUsers: Record<string, UserStatus>;
  updateUserStatus: (status: UserStatus) => Promise<void>;
}

const defaultContext: OnlineUsersContextType = {
  onlineUsers: {},
  updateUserStatus: async () => {}
};

const OnlineUsersContext = createContext<OnlineUsersContextType>(defaultContext);

export const useOnlineUsers = () => useContext(OnlineUsersContext);

export const OnlineUsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState<Record<string, UserStatus>>({});
  const [tracker, setTracker] = useState<ReturnType<typeof createOnlineUsersTracker> | null>(null);

  useEffect(() => {
    if (!user) {
      setOnlineUsers({});
      if (tracker) {
        tracker.unsubscribe();
      }
      return;
    }

    const newTracker = createOnlineUsersTracker(user.id);
    setTracker(newTracker);

    const channel = newTracker.subscribe(setOnlineUsers);

    return () => {
      newTracker.unsubscribe();
    };
  }, [user]);

  const updateUserStatus = async (status: UserStatus) => {
    if (tracker && user) {
      await tracker.updateStatus(status);
    }
  };

  return (
    <OnlineUsersContext.Provider value={{ onlineUsers, updateUserStatus }}>
      {children}
    </OnlineUsersContext.Provider>
  );
};
