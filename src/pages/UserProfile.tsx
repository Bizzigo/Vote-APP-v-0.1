import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  businessName: z.string().optional(),
  category: z.string().optional(),
  city: z.string().optional(),
  description: z.string().optional(),
  keywords: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
});

const UserProfile = () => {
  const { user, completeProfile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      businessName: "",
      category: "",
      city: "",
      description: "",
      keywords: "",
      phone: "",
      website: "",
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setSubmitting(true);
      
      if (!user) {
        toast.error("You need to be logged in to update your profile");
        return;
      }
      
      const profileData = {
        ...data,
        keywords: data.keywords.split(',').map(k => k.trim()),
      };
      
      await completeProfile(profileData);
      
      if (user && data.businessName) {
        // Create vendor entry if needed, with correct user_id
        const { error: vendorError } = await supabase
          .from('vendors')
          .insert({
            user_id: user.id, // Use user.id instead of user_id
            name: data.businessName || data.name,
            category: data.category,
            city: data.city,
            description: data.description,
            keywords: data.keywords ? data.keywords.split(',').map(k => k.trim()) : [],
            phone: data.phone,
            email: user.email,
            website: data.website,
            facebook: data.facebook,
            instagram: data.instagram,
            twitter: data.twitter,
            linkedin: data.linkedin,
          });
          
        if (vendorError) {
          console.error('Error creating vendor:', vendorError);
          toast.error("Failed to create vendor profile", {
            description: vendorError.message
          });
        } else {
          toast.success("Your vendor profile has been created successfully!");
          navigate('/');
        }
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to update profile", {
        description: "There was an error updating your profile. Please try again."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-3xl mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name that will be displayed on your profile.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your business name" {...field} />
                      </FormControl>
                      <FormDescription>
                        If you are a vendor, enter your business name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="cafe">Cafe</SelectItem>
                          <SelectItem value="bar">Bar</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose a category that best describes your business.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your city" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the city where your business is located.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a short description about your business"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Briefly describe your business to attract customers.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="pizza, burgers, pasta" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter keywords that describe your business, separated by commas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your business phone number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your website URL" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your business website URL.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Facebook page URL" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your business Facebook page URL.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Instagram profile URL" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your business Instagram profile URL.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Twitter profile URL" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your business Twitter profile URL.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your LinkedIn profile URL" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your business LinkedIn profile URL.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserProfile;
