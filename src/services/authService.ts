
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@/lib/types';

const SUPERADMIN_EMAIL = 'girts.kizenbahs@gmail.com';
import { mockAdminUser } from '@/lib/mockData';

export const login = async (email: string, provider: string) => {
  try {
    // For demo purposes, we're still allowing the superadmin workaround
    if (email.toLowerCase() === SUPERADMIN_EMAIL.toLowerCase()) {
      const newUser = { 
        ...mockAdminUser, 
        email: SUPERADMIN_EMAIL, 
        name: 'Super Admin',
        provider: provider as 'google' | 'facebook' | 'email',
        profileCompleted: true
      };
      
      return { user: newUser, error: null };
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
    
    return { error: null };
  } catch (error: any) {
    console.error('Login error:', error);
    toast.error("Login failed", {
      description: error.message || "There was a problem with the login process",
    });
    return { error };
  }
};

export const logout = async () => {
  try {
    await supabase.auth.signOut();
    
    toast.success("Logged out", {
      description: "You have been logged out successfully.",
    });
    return { error: null };
  } catch (error) {
    console.error('Logout error:', error);
    return { error };
  }
};

export const updateUser = async (user: User, userUpdates: Partial<User>) => {
  if (!user || !user.id) return { error: 'User not found' };
  
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
    
    return { user: updatedUser, error: null };
  } catch (error) {
    console.error('Update user error:', error);
    toast.error("Update failed", {
      description: "There was a problem updating your profile",
    });
    return { error };
  }
};

export const completeProfile = async (user: User | null, profileData: any) => {
  if (!user || !user.id) return { error: 'User not found' };
  
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
    
    return { user: updatedUser, error: null };
  } catch (error) {
    console.error('Complete profile error:', error);
    toast.error("Update failed", {
      description: "There was a problem updating your profile",
    });
    return { error };
  }
};

export const voteForCandidate = async (user: User | null, candidateId: string) => {
  if (!user) return { error: 'User not found' };
  
  if (user.hasVoted) {
    toast.error("Vote failed", {
      description: "You have already voted!",
    });
    return { error: 'Already voted' };
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
    
    toast.success("Vote recorded", {
      description: "Your vote has been recorded!",
    });
    
    return { user: updatedUser, error: null };
  } catch (error) {
    console.error('Vote error:', error);
    toast.error("Vote failed", {
      description: "There was a problem recording your vote",
    });
    return { error };
  }
};
