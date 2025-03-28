
import React, { useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Facebook, Github, Twitter } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';

const Login = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  
  // Check for error parameter in URL
  useEffect(() => {
    const errorType = searchParams.get('error');
    if (errorType === 'auth') {
      toast.error("Authentication failed", {
        description: "There was a problem with the authentication process"
      });
    }
  }, [searchParams]);

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

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'twitter' | 'github') => {
    try {
      console.log(`Initiating ${provider} login...`);
      const redirectTo = `${window.location.origin}/auth/callback`;
      console.log('Redirect URL:', redirectTo);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectTo
        }
      });

      if (error) {
        console.error(`${provider} login error:`, error);
        toast.error("Login failed", {
          description: error.message || `There was a problem with the ${provider} login process`,
        });
      } else {
        toast.info(`Redirecting to ${provider}`, {
          description: `Please wait while we redirect you to ${provider} for authentication`
        });
      }
    } catch (error) {
      console.error("Unexpected login error:", error);
      toast.error("Login failed", {
        description: "There was an unexpected problem with the login process. Please try again.",
      });
    }
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12">
        <Card className="animate-scale-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{t("welcomeBack") || "Welcome Back"}</CardTitle>
            <CardDescription className="text-center">
              {t("signInToContinue") || "Sign in to continue to the Vendor Directory"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleSocialLogin('google')}
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
                {t("signInWithGoogle") || "Sign in with Google"}
              </Button>
              
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleSocialLogin('facebook')}
              >
                <Facebook size={20} className="text-[#1877F2]" />
                {t("signInWithFacebook") || "Sign in with Facebook"}
              </Button>
              
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleSocialLogin('github')}
              >
                <Github size={20} />
                {t("signInWithGithub") || "Sign in with GitHub"}
              </Button>
              
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleSocialLogin('twitter')}
              >
                <Twitter size={20} className="text-[#1DA1F2]" />
                {t("signInWithX") || "Sign in with X"}
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {t("needVendorAccount") || "Need a vendor account?"}{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  {t("signUpHere") || "Sign up here"}
                </Link>
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
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

export default Login;
