import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/providers/AuthProvider';
import { profileService } from '@/services/profileService';

interface Profile {
  id?: string;
  email?: string;
  name?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
}

const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const { data, error } = await profileService.getProfile(user.id);
          if (error) {
            toast({
              title: "Failed to load profile",
              description: error.message,
              variant: "destructive",
            });
          } else {
            setProfile(data || {});
          }
        }
      } catch (err) {
        toast({
          title: "Error loading profile",
          description: err instanceof Error ? err.message : "An unknown error occurred",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Fix for the error in the saveProfile function:
  const saveProfile = async () => {
    setIsSaving(true);
    try {
      const { user, error: updateError } = await profileService.updateProfile(profile);
      
      if (updateError) {
        toast({
          title: "Failed to update profile",
          description: updateError.message,
          variant: "destructive",
        });
      } else {
        // Success
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated",
        });
      }
    } catch (err) {
      // Handle any unexpected errors
      toast({
        title: "Error updating profile",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
          <Card className="max-w-2xl w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Loading Profile...</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">Please wait while we load your profile information.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={profile.name || ''}
                onChange={handleChange}
                disabled={isSaving}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={profile.email || ''}
                onChange={handleChange}
                disabled={true}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Location
              </label>
              <Input
                type="text"
                id="location"
                name="location"
                placeholder="Your Location"
                value={profile.location || ''}
                onChange={handleChange}
                disabled={isSaving}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                Bio
              </label>
              <Input
                type="textarea"
                id="bio"
                name="bio"
                placeholder="Your Bio"
                value={profile.bio || ''}
                onChange={handleChange}
                disabled={isSaving}
              />
            </div>
            <Button onClick={saveProfile} disabled={isSaving} className="w-full">
              {isSaving ? "Saving..." : "Save Profile"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserProfile;
