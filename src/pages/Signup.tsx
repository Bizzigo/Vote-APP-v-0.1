
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter 
} from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Facebook, Github, Twitter } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';

const Signup = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('startup');
  const { t } = useLanguage();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      // If profile is not completed, redirect to profile page
      if (user && !user.profileCompleted) {
        navigate('/profile');
      } else {
        navigate('/');
      }
    }
  }, [isLoggedIn, navigate, user]);

  const handleSocialSignup = async (provider: 'google' | 'facebook' | 'twitter' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + '/auth/callback'
        }
      });
      
      if (error) {
        toast.error("Signup failed", {
          description: error.message || `There was a problem with the ${provider} signup process`,
        });
        console.error("Signup error:", error);
      }
    } catch (error) {
      toast.error("Signup failed", {
        description: "There was a problem with the signup process. Please try again.",
      });
      console.error("Signup error:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full bg-card animate-scale-in border border-border/40 shadow-sm p-6 rounded-md mb-8">
          <h1 className="text-3xl font-bold">{t("createVendorAccount") || "Create Your Vendor Account"}</h1>
          <p className="text-muted-foreground mt-2">{t("signUpPreferredSocial") || "Sign up with your preferred social account to get started"}</p>
        </div>
        
        <Card className="shadow-sm border-border/40">
          <CardHeader>
            <CardTitle>{t("createAccount") || "Create an Account"}</CardTitle>
            <CardDescription>
              {t("signUpMethod") || "Sign up with your preferred method to create your vendor account"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-center text-muted-foreground">
                {t("createAccountInfo") || "Create an account to register your business in our directory. After signing up, you'll be able to complete your vendor profile."}
              </p>
              
              <Button 
                onClick={() => handleSocialSignup('google')}
                className="w-full max-w-md flex items-center justify-center gap-2"
                variant="outline"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path
                      fill="#4285F4"
                      d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                    />
                  </g>
                </svg>
                {t("signUpWithGoogle") || "Sign up with Google"}
              </Button>
              
              <Button 
                onClick={() => handleSocialSignup('facebook')}
                className="w-full max-w-md flex items-center justify-center gap-2"
                variant="outline"
              >
                <Facebook size={20} className="text-[#1877F2]" />
                {t("signUpWithFacebook") || "Sign up with Facebook"}
              </Button>
              
              <Button 
                onClick={() => handleSocialSignup('github')}
                className="w-full max-w-md flex items-center justify-center gap-2"
                variant="outline"
              >
                <Github size={20} />
                {t("signUpWithGithub") || "Sign up with GitHub"}
              </Button>
              
              <Button 
                onClick={() => handleSocialSignup('twitter')}
                className="w-full max-w-md flex items-center justify-center gap-2"
                variant="outline"
              >
                <Twitter size={20} className="text-[#1DA1F2]" />
                {t("signUpWithX") || "Sign up with X"}
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-center text-sm">
              {t("alreadyHaveAccount") || "Already have an account?"}{" "}
              <Link to="/login" className="text-primary hover:underline">
                {t("logIn") || "Log in"}
              </Link>
            </p>
            
            <p className="text-center text-xs text-muted-foreground">
              {t("byContinuing") || "By continuing, you agree to our"}{" "}
              <Link to="/terms" className="underline hover:text-primary">
                {t("termsOfService") || "Terms of Service"}
              </Link>{" "}
              {t("and") || "and"}{" "}
              <Link to="/privacy" className="underline hover:text-primary">
                {t("privacyPolicy") || "Privacy Policy"}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Signup;
