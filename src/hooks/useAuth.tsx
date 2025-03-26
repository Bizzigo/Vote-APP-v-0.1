
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, Role } from '@/lib/types';
import { mockVisitorUser, mockAdminUser } from '@/lib/mockData';
import { useToast } from "@/hooks/use-toast";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SUPERADMIN_EMAIL = 'girts.kizenbahs@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up Supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        
        if (session) {
          try {
            // Fetch user profile from Supabase
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();
            
            if (error) {
              console.error('Error fetching user profile:', error);
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
              };
              
              setUser(mappedUser);
              
              // Redirect if profile needs to be completed
              if (!profile.profile_completed) {
                navigate('/profile');
              }
            }
          } catch (error) {
            console.error('Error in auth state change handler:', error);
          }
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );
    
    // Check for existing session
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Session will be handled by the onAuthStateChange event
      } else {
        setLoading(false);
      }
    };
    
    initializeAuth();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const login = async (email: string, provider: string) => {
    try {
      setLoading(true);
      
      // For demo purposes, we're still allowing the superadmin workaround
      if (email.toLowerCase() === SUPERADMIN_EMAIL.toLowerCase()) {
        const newUser = { 
          ...mockAdminUser, 
          email: SUPERADMIN_EMAIL, 
          name: 'Super Admin',
          provider: provider as 'google' | 'facebook' | 'email',
          profileCompleted: true
        };
        
        setUser(newUser);
        toast.success("Welcome, Admin!", {
          description: `You've successfully logged in with administrator privileges`,
        });
        return;
      }
      
      // Real authentication with Supabase - Only Google auth is enabled
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error("Login failed", {
        description: error.message || "There was a problem with the login process",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userUpdates: Partial<User>) => {
    if (!user || !user.id) return;
    
    try {
      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          name: userUpdates.name,
          has_voted: userUpdates.hasVoted,
          voted_for: userUpdates.votedFor,
          subscription_plan: userUpdates.subscriptionPlan,
          subscription_status: userUpdates.subscriptionStatus,
          // Don't update profile_completed here
        })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      const updatedUser = {
        ...user,
        ...userUpdates
      };
      
      setUser(updatedUser);
    } catch (error) {
      console.error('Update user error:', error);
      toast.error("Update failed", {
        description: "There was a problem updating your profile",
      });
    }
  };

  const completeProfile = async (profileData: any) => {
    if (!user || !user.id) return;
    
    try {
      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          profile_completed: true
        })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      const updatedUser = {
        ...user,
        ...profileData,
        profileCompleted: true
      };
      
      setUser(updatedUser);
      
      // Add vendor data if applicable
      if (profileData.businessName) {
        // Create vendor entry
        const { error: vendorError } = await supabase
          .from('vendors')
          .insert({
            user_id: user.id,
            name: profileData.businessName || profileData.name,
            category: profileData.category,
            city: profileData.city,
            description: profileData.description,
            keywords: profileData.keywords ? profileData.keywords.split(',').map((k: string) => k.trim()) : [],
            phone: profileData.phone,
            email: user.email,
            website: profileData.website,
            facebook: profileData.facebook,
            instagram: profileData.instagram,
            twitter: profileData.twitter,
            linkedin: profileData.linkedin,
          });
          
        if (vendorError) {
          console.error('Error creating vendor:', vendorError);
        }
      }
      
      toast.success("Profile completed", {
        description: "Your vendor profile has been successfully set up!",
      });
    } catch (error) {
      console.error('Complete profile error:', error);
      toast.error("Update failed", {
        description: "There was a problem updating your profile",
      });
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      
      toast.success("Logged out", {
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const voteForCandidate = async (candidateId: string) => {
    if (!user) return;
    
    if (user.hasVoted) {
      uiToast({
        title: "Vote failed",
        description: "You have already voted!",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Update user's voting status
      const { error } = await supabase
        .from('profiles')
        .update({
          has_voted: true,
          voted_for: candidateId
        })
        .eq('id', user.id);
        
      if (error) {
        throw error;
      }
      
      // Update candidate vote count
      const { error: candidateError } = await supabase.rpc('increment_vote_count', {
        candidate_id: candidateId
      });
      
      if (candidateError) {
        console.error('Error updating candidate vote count:', candidateError);
      }
      
      // Update local state
      const updatedUser = {
        ...user,
        hasVoted: true,
        votedFor: candidateId,
      };
      
      setUser(updatedUser);
      
      uiToast({
        title: "Vote recorded",
        description: "Your vote has been recorded!",
      });
    } catch (error) {
      console.error('Vote error:', error);
      uiToast({
        title: "Vote failed",
        description: "There was a problem recording your vote",
        variant: "destructive",
      });
    }
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
    updateUser,
    completeProfile
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
