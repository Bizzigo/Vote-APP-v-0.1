
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/lib/types';

export const updateUser = async (currentUser: User, updates: Partial<User>) => {
  try {
    if (!currentUser) {
      return { error: { message: 'No user logged in' } };
    }
    
    // Update the profile in Supabase
    const { data, error } = await supabase
      .from('profiles')
      .update({
        name: updates.name,
        avatar_url: updates.avatarUrl,
        // Add other fields as needed
      })
      .eq('id', currentUser.id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating user:', error);
      return { error };
    }
    
    // Return the updated user
    const updatedUser: User = {
      ...currentUser,
      ...updates
    };
    
    return { user: updatedUser, error: null };
  } catch (error: any) {
    return { error };
  }
};

export const completeProfile = async (
  currentUser: User | null, 
  profileData: any
) => {
  try {
    if (!currentUser) {
      return { error: { message: 'No user logged in' }, user: null };
    }
    
    console.log('Updating profile for user:', currentUser.id);
    console.log('Profile data to save:', profileData);
    
    // Update the profile in Supabase
    const { data, error } = await supabase
      .from('profiles')
      .update({
        name: profileData.name,
        business_name: profileData.businessName,
        category: profileData.category,
        city: profileData.city,
        description: profileData.description,
        keywords: profileData.keywords,
        phone: profileData.phone,
        website: profileData.website,
        facebook: profileData.facebook,
        instagram: profileData.instagram,
        twitter: profileData.twitter,
        linkedin: profileData.linkedin,
        avatar_url: profileData.avatarUrl || currentUser.avatarUrl,
        profile_completed: true // Mark the profile as completed
      })
      .eq('id', currentUser.id)
      .select()
      .single();
    
    if (error) {
      console.error('Error completing profile:', error);
      return { error, user: null };
    }
    
    console.log('Profile updated successfully:', data);
    
    // Return the updated user
    const updatedUser: User = {
      ...currentUser,
      name: profileData.name,
      avatarUrl: profileData.avatarUrl || currentUser.avatarUrl,
      profileCompleted: true
    };
    
    return { user: updatedUser, error: null };
  } catch (error: any) {
    console.error('Unexpected error in completeProfile:', error);
    return { error, user: null };
  }
};
