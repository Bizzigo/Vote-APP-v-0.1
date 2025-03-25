
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/lib/types';
import { mockVisitorUser, mockAdminUser } from '@/lib/mockData';
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SUPERADMIN_EMAIL = 'girts.kizenbahs@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('votingAppUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, provider: string) => {
    // Check if the user is the superadmin
    const isSuperAdmin = email.toLowerCase() === SUPERADMIN_EMAIL.toLowerCase();
    const newUser = isSuperAdmin ? { 
      ...mockAdminUser, 
      email: SUPERADMIN_EMAIL, 
      name: 'Super Admin',
    } : mockVisitorUser;
    
    // In a real app, this would be an API call
    setUser(newUser);
    localStorage.setItem('votingAppUser', JSON.stringify(newUser));
    toast({
      title: "Welcome back!",
      description: `Welcome back, ${newUser.name}!`,
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('votingAppUser');
    toast({
      title: "Logged out",
      description: "You have been logged out.",
    });
  };

  const voteForCandidate = (candidateId: string) => {
    if (!user) return;
    
    if (user.hasVoted) {
      toast({
        title: "Vote failed",
        description: "You have already voted!",
        variant: "destructive",
      });
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
    toast({
      title: "Vote recorded",
      description: "Your vote has been recorded!",
    });
    
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
