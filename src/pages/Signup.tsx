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
import { User, Mail, Building, Phone, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { SubscriptionPlans } from '@/components/subscription/SubscriptionPlans';

const formSchema = z.object({
  name: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  phone: z.string().min(8, { message: "Please enter a valid phone number." }),
  description: z.string().optional(),
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
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Create Your Vendor Account</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Enter your details to create a vendor account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                  <Tabs defaultValue="account" className="w-full">
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="account">Account Details</TabsTrigger>
                      <TabsTrigger value="business">Business Info</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="account" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      </div>
                      
                      <div className="flex flex-col space-y-4 mt-6">
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
                    </TabsContent>
                    
                    <TabsContent value="business" className="space-y-4">
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <FormControl>
                                <select
                                  className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
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
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Description</FormLabel>
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
                    </TabsContent>
                  </Tabs>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          {/* Subscription Plans */}
          <Card>
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
          
          <div className="text-center text-sm mt-4">
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
