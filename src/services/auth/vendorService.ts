
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/lib/types';

export const createOrUpdateVendor = async (user: User, profileData: any) => {
  try {
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
      category: profileData.category || null,
      city: profileData.city || null,
      description: profileData.description || null,
      keywords: keywords,
      phone: profileData.phone || null,
      email: user.email,
      website: profileData.website || null,
      facebook: profileData.facebook || null,
      instagram: profileData.instagram || null,
      twitter: profileData.twitter || null,
      linkedin: profileData.linkedin || null,
    };

    console.log('Vendor data to save:', vendorData);
    
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
    
    return { error: null };
  } catch (error) {
    console.error('Vendor operation error:', error);
    return { error };
  }
};
