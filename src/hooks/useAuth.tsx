import React, { createContext, useContext, useState } from 'react';
import { User, AuthContextType, Role } from '@/lib/types';
import { mockVisitorUser, mockAdminUser } from '@/lib/mockData';
import { toast } from "@/components/ui/use-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('votingAppUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, role: Role) => {
    const newUser = role === 'admin' ? mockAdminUser : mockVisitorUser;
    
    // In a real app, this would be an API call
    setUser(newUser);
    localStorage.setItem('votingAppUser', JSON.stringify(newUser));
    toast.success(`Welcome back, ${newUser.name}!`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('votingAppUser');
    toast.success('You have been logged out.');
  };

  const voteForCandidate = (candidateId: string) => {
    if (!user) return;
    
    if (user.hasVoted) {
      toast.error('You have already voted!');
      return;
    }
    
    // Update user's voting status
    const updatedUser = {
      ...user,
      hasVoted: true,
      votedFor: candidateId,
    };
    
    setUser(updatedUser);
    localStorage.setItem('votingAppUser', JSON.stringify(updatedUser));
    toast.success('Your vote has been recorded!');
    
    // In a real app, this would also update the candidate's vote count via API
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    login,
    logout,
    voteForCandidate,
    isLoggedIn,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
