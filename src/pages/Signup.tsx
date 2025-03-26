
import React, { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { User, Mail, Building, Phone, MapPin, Globe, Facebook, Instagram, Twitter, Linkedin, Hash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { SubscriptionPlans } from '@/components/subscription/SubscriptionPlans';

const formSchema = z.object({
  // Personal info
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  
  // Business info
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  phone: z.string().min(8, { message: "Please enter a valid phone number." }),
  description: z.string().min(10, { message: "Please enter a business description." }),
  
  // Keywords
  keywords: z.string().optional(),
  
  // Contact info
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
});

const Signup = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('startup');

  // Redirect if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      businessName: "",
      category: "",
      city: "",
      phone: "",
      description: "",
      keywords: "",
      website: "",
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
    },
  });

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedPlan) {
      toast.error("Please select a subscription plan");
      return;
    }

    // In a real app, this would be an API call to register
    console.log("Form values:", values);
    console.log("Selected plan:", selectedPlan);
    
    // Simulate signup and login
    login(values.email, 'email');
    toast.success("Account created successfully!");
    navigate('/profile');
  };

  const handleSocialSignup = (provider: string) => {
    // In a real app, this would initiate OAuth flow
    login(`user@example.com`, provider);
    navigate('/profile');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full bg-card animate-scale-in border border-border/40 shadow-sm p-6 rounded-md mb-8">
          <h1 className="text-3xl font-bold">Create Your Vendor Account</h1>
          <p className="text-muted-foreground mt-2">Enter your business details to get started</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="shadow-sm border-border/40">
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Enter your details to create a vendor account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-foreground">Account Information</h3>
                      
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="John Doe" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="your@email.com" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex flex-col space-y-4 mt-4">
                        <p className="text-sm text-muted-foreground">Sign up with social accounts</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => handleSocialSignup('google')}
                            className="flex items-center justify-center gap-2"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M8 12 h8"></path>
                              <path d="M12 8 v8"></path>
                            </svg>
                            Sign up with Google
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => handleSocialSignup('facebook')}
                            className="flex items-center justify-center gap-2"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                            Sign up with Facebook
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-foreground">Business Details</h3>
                      
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="Your Business Name" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <FormControl>
                                <select
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  {...field}
                                >
                                  <option value="">Select Category</option>
                                  <option value="Technology">Technology</option>
                                  <option value="Finance">Finance</option>
                                  <option value="Healthcare">Healthcare</option>
                                  <option value="Retail">Retail</option>
                                  <option value="Food">Food</option>
                                  <option value="Education">Education</option>
                                  <option value="Transportation">Transportation</option>
                                  <option value="Energy">Energy</option>
                                  <option value="Entertainment">Entertainment</option>
                                  <option value="Construction">Construction</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                  <Input className="pl-10" placeholder="City" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="+371 20 123 456" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4 text-foreground">Business Description</h3>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your business..."
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="keywords"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Keywords (comma separated)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input 
                                className="pl-10" 
                                placeholder="e.g. consulting, development, design" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                          <p className="text-sm text-muted-foreground mt-1">These keywords will help customers find your business</p>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4 text-foreground">Additional Contact Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="https://example.com" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <h4 className="text-md font-medium mt-4 mb-2">Social Media (optional)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="facebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facebook</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="Facebook profile" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instagram</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="Instagram handle" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="Twitter handle" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="LinkedIn profile" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          {/* Subscription Plans */}
          <Card className="shadow-sm border-border/40">
            <CardHeader>
              <CardTitle>Choose a Subscription Plan</CardTitle>
              <CardDescription>
                Select the plan that best fits your business needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionPlans selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
            </CardContent>
          </Card>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              onClick={form.handleSubmit(handleFormSubmit)}
              className="w-full md:w-auto font-medium"
              size="lg"
            >
              Create Vendor Account
            </Button>
          </div>
          
          <div className="text-center text-sm mt-4 mb-8">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
