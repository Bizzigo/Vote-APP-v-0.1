import React, { useState } from 'react';
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
  CheckCircle2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionPlans } from '@/components/subscription/SubscriptionPlans';

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
  const { user } = useAuth();
  const { toast } = useToast();
  const [avatar, setAvatar] = useState(placeholderImage);
  const [activeTab, setActiveTab] = useState("business");
  const [subscriptionPlan, setSubscriptionPlan] = useState("startup");
  
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Profile updated",
      description: "Your vendor profile has been successfully updated.",
    });
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
        <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
        
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
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            name="telegram"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telegram</FormLabel>
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
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="payment" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="acceptsCreditCard"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="h-4 w-4"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="flex items-center">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Credit Card
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="acceptsBankTransfer"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="h-4 w-4"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="flex items-center">
                                    <BanknoteIcon className="mr-2 h-4 w-4" />
                                    Bank Transfer
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="acceptsPaypal"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="h-4 w-4"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                      <path d="M7 11a4 4 0 0 0 4 4h1a4 4 0 0 0 4-4v-2a4 4 0 0 0-4-4h-1a4 4 0 0 0-4 4v2z"></path>
                                      <path d="M19 5v14"></path>
                                    </svg>
                                    PayPal
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="acceptsCrypto"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="h-4 w-4"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="flex items-center">
                                    <Wallet className="mr-2 h-4 w-4" />
                                    Cryptocurrency
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="paymentNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payment Notes</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Additional payment information..." 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                      
                      <TabsContent value="services" className="space-y-4">
                        <FormField
                          control={form.control}
                          name="services"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Services (comma separated)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  className="min-h-[120px]" 
                                  placeholder="List your services separated by commas..."
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                          <div className="flex flex-wrap gap-2">
                            {form.watch("services")?.split(',').map((service, i) => (
                              service.trim() && (
                                <Badge key={i} variant="outline">
                                  {service.trim()}
                                </Badge>
                              )
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="subscription" className="space-y-4">
                        <div className="mb-6">
                          <h3 className="text-lg font-medium mb-3">Current Subscription</h3>
                          <div className="bg-muted/40 p-4 rounded-md border border-border/40 mb-6">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle2 className="text-green-500 h-5 w-5" />
                              <span className="font-medium">{subscriptionPlan === 'hobby' ? 'Hobby' : 
                                subscriptionPlan === 'freelancer' ? 'Freelancer' : 
                                subscriptionPlan === 'startup' ? 'Startup' : 'Enterprise'} Plan</span>
                            </div>
                            <div className="pl-7 space-y-1 text-sm text-muted-foreground">
                              <p>Billing: Monthly</p>
                              <p>Next payment: August 15, 2023</p>
                              <p>Payment method: Visa ending in 4242</p>
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-medium mb-3">Change Subscription Plan</h3>
                          <SubscriptionPlans selectedPlan={subscriptionPlan} setSelectedPlan={setSubscriptionPlan} />
                          
                          <div className="mt-6 flex justify-end">
                            <Button variant="default" className="font-medium">
                              Update Subscription
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    {activeTab !== "subscription" && (
                      <Button type="submit" className="w-full sm:w-auto flex items-center gap-2">
                        <Save size={16} />
                        Save Changes
                      </Button>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
