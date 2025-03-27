
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Role } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import AuthContext from '@/contexts/AuthContext';
import * as authService from '@/services/authService';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set up Supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        
        if (session) {
          // Use setTimeout to prevent potential auth deadlocks
          setTimeout(async () => {
            try {
              // Fetch user profile from Supabase
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle();
              
              if (error) {
                console.error('Error fetching user profile:', error);
                setLoading(false);
                return;
              }
  
              if (profile) {
                // Map Supabase profile to our User type
                const mappedUser: User = {
                  id: profile.id,
                  name: profile.name || session.user.user_metadata.full_name || 'User',
                  email: profile.email || session.user.email || '',
                  role: (profile.role || 'visitor') as Role,
                  hasVoted: profile.has_voted || false,
                  votedFor: profile.voted_for || undefined,
                  subscriptionPlan: profile.subscription_plan as any || undefined,
                  subscriptionStatus: profile.subscription_status as any || undefined,
                  profileCompleted: profile.profile_completed || false,
                  provider: profile.provider as any || 'google',
                  avatarUrl: profile.avatar_url || session.user.user_metadata.avatar_url || undefined,
                };
                
                setUser(mappedUser);
                
                // Only redirect if we're not already on the profile page
                // and the profile needs to be completed
                const currentPath = location.pathname;
                if (!profile.profile_completed && 
                    !currentPath.includes('/profile') && 
                    !currentPath.includes('/auth/callback') &&
                    !currentPath.includes('/login')) {
                  navigate('/profile');
                }
              }
            } catch (error) {
              console.error('Error in auth state change handler:', error);
            } finally {
              setLoading(false);
            }
          }, 0);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );
    
    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // Session will be handled by the onAuthStateChange event if it exists
        if (!session) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setLoading(false);
      }
    };
    
    initializeAuth();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location]);

  const login = async (email: string, provider: string) => {
    try {
      setLoading(true);
      const result = await authService.login(email, provider);
      
      if (result.user) {
        setUser(result.user);
      }
      
      return result;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userUpdates: Partial<User>) => {
    if (!user) return;
    
    const result = await authService.updateUser(user, userUpdates);
    if (result.user) {
      setUser(result.user);
    }
  };

  const completeProfile = async (profileData: any) => {
    const result = await authService.completeProfile(user, profileData);
    if (result.user) {
      setUser(result.user);
    }
    return result;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setSession(null);
    // Add redirect to home page after logout
    navigate('/');
  };

  const voteForCandidate = async (candidateId: string) => {
    const result = await authService.voteForCandidate(user, candidateId);
    if (result.user) {
      setUser(result.user);
    }
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';

  return <AuthContext.Provider value={{
    user,
    login,
    logout,
    voteForCandidate,
    isLoggedIn,
    isAdmin,
    updateUser,
    completeProfile
  }}>{loading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="mb-4 w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto"></div>
        <p className="text-xl font-medium">Loading...</p>
      </div>
    </div>
  ) : children}</AuthContext.Provider>;
};
