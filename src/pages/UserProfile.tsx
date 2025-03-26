import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { placeholderImage } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Facebook, 
  Instagram, 
  MessageSquare,
  Save,
  Upload,
  Building,
  Calendar,
  Hash,
  CreditCard,
  Wallet,
  BanknoteIcon,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionPlans } from '@/components/subscription/SubscriptionPlans';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  // Business info
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  category: z.string().min(2, { message: "Category must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  registrationNumber: z.string().optional(),
  registrationDate: z.string().optional(),
  keywords: z.string().optional(),
  
  // Contact info
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  whatsapp: z.string().optional(),
  telegram: z.string().optional(),
  
  // Payment info
  acceptsCreditCard: z.boolean().optional(),
  acceptsBankTransfer: z.boolean().optional(),
  acceptsPaypal: z.boolean().optional(),
  acceptsCrypto: z.boolean().optional(),
  paymentNotes: z.string().optional(),
  
  // Services
  services: z.string().optional(),
});

const UserProfile = () => {
  const { user, updateUser, completeProfile } = useAuth();
  const { toast: uiToast } = useToast();
  const [avatar, setAvatar] = useState(placeholderImage);
  const [activeTab, setActiveTab] = useState("business");
  const [subscriptionPlan, setSubscriptionPlan] = useState("startup");
  const [isNewUser, setIsNewUser] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user && user.profileCompleted === false) {
      setIsNewUser(true);
      toast.info("Complete your profile", {
        description: "Please complete your vendor profile to get started",
      });
    }
  }, [user]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Business info
      name: user?.name || "",
      category: "Technology",
      description: "Professional services with a focus on quality and customer satisfaction.",
      registrationNumber: "LV12345678",
      registrationDate: "2020-01-01",
      keywords: "Consulting, Development, Services",
      
      // Contact info
      email: user?.email || "",
      phone: "+371 20 000 000",
      city: "Riga",
      website: "https://example.com",
      facebook: "vendor_profile",
      instagram: "vendor_profile",
      whatsapp: "+37120000000",
      telegram: "vendor_profile",
      
      // Payment info
      acceptsCreditCard: true,
      acceptsBankTransfer: true,
      acceptsPaypal: false,
      acceptsCrypto: false,
      paymentNotes: "Payment due within 30 days of invoice.",
      
      // Services
      services: "Web Development, Mobile Apps, Cloud Services, Consulting, UI/UX Design",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      // Process keywords into an array for storage
      const keywordsArray = values.keywords 
        ? values.keywords.split(',').map(k => k.trim()).filter(Boolean) 
        : [];
        
      // Services array
      const servicesArray = values.services
        ? values.services.split(',').map(s => s.trim()).filter(Boolean)
        : [];
      
      if (isNewUser) {
        // Save profile data
        const profileData = {
          name: values.name,
          profile_completed: true,
          businessName: values.name,
          category: values.category,
          city: values.city
        };
        
        // Create vendor data
        const vendorData = {
          user_id: user.id,
          name: values.name,
          category: values.category,
          city: values.city,
          description: values.description,
          keywords: keywordsArray,
          phone: values.phone,
          email: values.email,
          website: values.website && values.website.length > 0 ? values.website : null,
          facebook: values.facebook,
          instagram: values.instagram,
          twitter: null, // Not in form currently
          linkedin: null, // Not in form currently
        };
        
        // Update profile in Supabase
        const { error: profileError } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', user.id);
          
        if (profileError) {
          throw new Error(`Error updating profile: ${profileError.message}`);
        }
        
        // Insert vendor in Supabase
        const { error: vendorError } = await supabase
          .from('vendors')
          .insert(vendorData);
          
        if (vendorError) {
          throw new Error(`Error creating vendor: ${vendorError.message}`);
        }
        
        // Call completeProfile to update local state
        await completeProfile({
          name: values.name,
          profileCompleted: true
        });
        
        toast.success("Profile created", {
          description: "Your vendor profile has been successfully created.",
        });
        
        navigate('/');
      } else {
        // Update existing profile
        // First update the profile
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            name: values.name,
          })
          .eq('id', user.id);
          
        if (profileError) {
          throw new Error(`Error updating profile: ${profileError.message}`);
        }
        
        // Check if vendor record exists
        const { data: existingVendor, error: vendorCheckError } = await supabase
          .from('vendors')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (vendorCheckError) {
          throw new Error(`Error checking vendor: ${vendorCheckError.message}`);
        }
        
        // Prepare vendor data
        const vendorData = {
          name: values.name,
          category: values.category,
          city: values.city,
          description: values.description,
          keywords: keywordsArray,
          phone: values.phone,
          email: values.email,
          website: values.website && values.website.length > 0 ? values.website : null,
          facebook: values.facebook,
          instagram: values.instagram,
        };
        
        if (existingVendor) {
          // Update existing vendor
          const { error: updateError } = await supabase
            .from('vendors')
            .update(vendorData)
            .eq('id', existingVendor.id);
            
          if (updateError) {
            throw new Error(`Error updating vendor: ${updateError.message}`);
          }
        } else {
          // Create new vendor if not exists
          vendorData.user_id = user.id;
          const { error: insertError } = await supabase
            .from('vendors')
            .insert(vendorData);
            
          if (insertError) {
            throw new Error(`Error creating vendor: ${insertError.message}`);
          }
        }
        
        // Update local state
        updateUser({
          name: values.name,
        });
        
        uiToast({
          title: "Profile updated",
          description: "Your vendor profile has been successfully updated.",
        });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error("Save failed", {
        description: error instanceof Error ? error.message : "There was a problem saving your profile",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePlan = () => {
    setActiveTab("subscription");
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-xl">Please log in to view your profile</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-4xl mx-auto">
        {isNewUser ? (
          <div className="bg-card border border-border/40 p-6 rounded-md mb-6 animate-scale-in">
            <h1 className="text-3xl font-bold">Complete Your Vendor Profile</h1>
            <p className="text-muted-foreground mt-2">
              Welcome! Let's set up your vendor profile to get started.
            </p>
          </div>
        ) : (
          <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Logo</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32 rounded-md">
                  <AvatarImage src={avatar} alt={user.name} className="object-cover" />
                  <AvatarFallback className="rounded-md bg-secondary text-2xl">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="w-full">
                  <Label htmlFor="avatar" className="mb-2 block">Change logo</Label>
                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" className="w-full" size="sm">
                      <label htmlFor="avatar" className="cursor-pointer flex items-center justify-center gap-2">
                        <Upload size={16} />
                        <span>Upload</span>
                        <input
                          id="avatar"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    </Button>
                  </div>
                </div>
                
                <div className="w-full pt-4 border-t border-border">
                  <h3 className="font-medium mb-2">Account Type</h3>
                  <Badge variant="outline" className="w-full justify-center py-1">
                    {user.role === 'admin' ? 'Administrator' : 'Vendor'}
                  </Badge>
                </div>
                
                {user.provider && (
                  <div className="w-full pt-4 border-t border-border">
                    <h3 className="font-medium mb-2">Connected With</h3>
                    <Badge variant="outline" className="w-full justify-center py-1 flex items-center gap-2">
                      {user.provider === 'google' ? (
                        <>
                          <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                            </g>
                          </svg>
                          Google
                        </>
                      ) : user.provider === 'facebook' ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                          </svg>
                          Facebook
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          Email
                        </>
                      )}
                    </Badge>
                  </div>
                )}
                
                <div className="w-full pt-4 border-t border-border">
                  <h3 className="font-medium mb-2">Current Plan</h3>
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{subscriptionPlan === 'hobby' ? 'Hobby' : 
                        subscriptionPlan === 'freelancer' ? 'Freelancer' : 
                        subscriptionPlan === 'startup' ? 'Startup' : 'Enterprise'}</span>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {subscriptionPlan === 'hobby' ? '$19/month' : 
                       subscriptionPlan === 'freelancer' ? '$29/month' : 
                       subscriptionPlan === 'startup' ? '$59/month' : '$99/month'}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={handleChangePlan}
                    >
                      Change Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{isNewUser ? "Complete Your Profile" : "Business Information"}</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {isNewUser ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium">1</div>
                            <span className="font-medium">Basic Information</span>
                          </div>
                          <div className="text-sm text-muted-foreground">Step 1 of 1</div>
                        </div>
                        
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
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
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    className="min-h-[120px]" 
                                    placeholder="Tell customers about your business and services..."
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
                              <FormItem>
                                <FormLabel>Keywords (comma separated)</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="e.g., Development, Design, Marketing" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full gap-2 mt-4"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <span>Complete Profile</span>
                              <ArrowRight size={16} />
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid grid-cols-5 mb-4">
                          <TabsTrigger value="business">Business</TabsTrigger>
                          <TabsTrigger value="contact">Contact</TabsTrigger>
                          <TabsTrigger value="payment">Payment</TabsTrigger>
                          <TabsTrigger value="services">Services</TabsTrigger>
                          <TabsTrigger value="subscription">Subscription</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="business" className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Name</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-10" {...field} />
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
                                    <Input {...field} />
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
                                      <Input className="pl-10" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="registrationNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Registration Number</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input className="pl-10" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="registrationDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Registration Date</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input type="date" className="pl-10" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    className="min-h-[120px]" 
                                    placeholder="Tell customers about your business and services..."
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
                              <FormItem>
                                <FormLabel>Keywords (comma separated)</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="e.g., Development, Design, Marketing" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TabsContent>
                        
                        <TabsContent value="contact" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input className="pl-10" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input className="pl-10" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="website"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Website</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input className="pl-10" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <h3 className="font-medium mt-4 mb-2">Social Media</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="facebook"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Facebook</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input className="pl-10" {...field} />
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
                                      <Input className="pl-10" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="whatsapp"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>WhatsApp</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input className="pl-10" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
