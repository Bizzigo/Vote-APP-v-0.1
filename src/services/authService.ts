
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
    console.log('Completing profile with data:', profileData);
    
    // Prepare data for the profiles table update
    const profileUpdate = {
      name: profileData.name,
      profile_completed: true,
      // Added fields from form
      phone: profileData.phone,
      // Include fields even if empty to ensure they're saved
      website: profileData.website || null,
      facebook: profileData.facebook || null,
      instagram: profileData.instagram || null,
      twitter: profileData.twitter || null,
      linkedin: profileData.linkedin || null
    };
    
    // Update profile in Supabase
    const { error: profileError } = await supabase
      .from('profiles')
      .update(profileUpdate)
      .eq('id', user.id);
    
    if (profileError) {
      console.error('Error updating profile:', profileError);
      throw profileError;
    }
    
    // Create vendor entry if business name is provided
    if (profileData.businessName) {
      // Format keywords properly
      const keywords = profileData.keywords 
        ? profileData.keywords.split(',').map((k: string) => k.trim()) 
        : [];
      
      // Check if vendor already exists
      const { data: existingVendor } = await supabase
        .from('vendors')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      const vendorData = {
        user_id: user.id,
        name: profileData.businessName || profileData.name,
        category: profileData.category,
        city: profileData.city,
        description: profileData.description,
        keywords: keywords,
        phone: profileData.phone,
        email: user.email,
        website: profileData.website,
        facebook: profileData.facebook,
        instagram: profileData.instagram,
        twitter: profileData.twitter,
        linkedin: profileData.linkedin,
      };
      
      let vendorError;
      
      if (existingVendor) {
        // Update existing vendor
        const { error } = await supabase
          .from('vendors')
          .update(vendorData)
          .eq('id', existingVendor.id);
        vendorError = error;
      } else {
        // Create new vendor
        const { error } = await supabase
          .from('vendors')
          .insert(vendorData);
        vendorError = error;
      }
      
      if (vendorError) {
        console.error('Error with vendor data:', vendorError);
        throw vendorError;
      }
    }
    
    // Update local state
    const updatedUser = {
      ...user,
      name: profileData.name,
      profileCompleted: true
    };
    
    toast.success("Profile completed", {
      description: profileData.businessName 
        ? "Your vendor profile has been successfully set up!" 
        : "Your profile has been updated successfully!",
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
