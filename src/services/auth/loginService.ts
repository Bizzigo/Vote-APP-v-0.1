
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@/lib/types';
import { mockAdminUser } from '@/lib/mockData';

const SUPERADMIN_EMAIL = 'girts.kizenbahs@gmail.com';

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
