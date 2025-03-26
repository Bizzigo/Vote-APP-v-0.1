
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error during auth callback:', error);
        navigate('/login?error=auth');
        return;
      }
      
      if (data?.session) {
        // Check if profile is completed
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('profile_completed')
          .eq('id', data.session.user.id)
          .maybeSingle();
          
        if (profileError) {
          console.error('Error fetching profile:', profileError);
          navigate('/');
          return;
        }
        
        // Redirect based on profile completion status
        if (profile && !profile.profile_completed) {
          navigate('/profile');
        } else {
          navigate('/');
        }
      } else {
        navigate('/login');
      }
    };
    
    handleAuthCallback();
  }, [navigate]);
  
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl">Completing login...</p>
    </div>
  );
};

export default AuthCallback;
