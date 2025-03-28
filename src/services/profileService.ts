
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id?: string;
  email?: string;
  name?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
}

interface ProfileResponse {
  data?: Profile | null;
  error?: any;
}

interface UpdateProfileResponse {
  user?: any;
  error?: any;
}

const getProfile = async (userId: string): Promise<ProfileResponse> => {
  try {
    console.log('Fetching profile for user:', userId);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return { error };
    }
    
    console.log('Profile fetched successfully:', data);
    return { data };
  } catch (err) {
    console.error('Unexpected error in getProfile:', err);
    return { error: err };
  }
};

const updateProfile = async (profile: Profile): Promise<UpdateProfileResponse> => {
  try {
    if (!profile.id) {
      console.error('Profile update failed: No ID provided');
      return { error: { message: 'Profile ID is required' } };
    }
    
    console.log('Updating profile with data:', profile);
    
    const { data, error } = await supabase
      .from('profiles')
      .update({
        name: profile.name,
        bio: profile.bio,
        location: profile.location,
        avatar_url: profile.avatarUrl,
      })
      .eq('id', profile.id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating profile:', error);
      return { error };
    }
    
    console.log('Profile updated successfully:', data);
    return { user: data };
  } catch (err) {
    console.error('Unexpected error in updateProfile:', err);
    return { error: err };
  }
};

export const profileService = {
  getProfile,
  updateProfile,
};
