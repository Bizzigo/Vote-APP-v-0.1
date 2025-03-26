
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@/lib/types';

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
      // Include all fields from the form, not just phone
      phone: profileData.phone || null,
      website: profileData.website || null,
      facebook: profileData.facebook || null,
      instagram: profileData.instagram || null,
      twitter: profileData.twitter || null,
      linkedin: profileData.linkedin || null
    };
    
    console.log('Updating profile with:', profileUpdate);
    
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
      // Import and use vendorService to handle vendor-related operations
      const { createOrUpdateVendor } = await import('./vendorService');
      const vendorResult = await createOrUpdateVendor(user, profileData);
      
      if (vendorResult.error) {
        throw vendorResult.error;
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
