
export type Role = 'admin' | 'visitor';
export type SubscriptionPlan = 'startup' | 'enterprise';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  hasVoted: boolean;
  votedFor?: string;
  subscriptionPlan?: SubscriptionPlan;
  subscriptionStatus?: 'active' | 'canceled' | 'past_due';
  profileCompleted?: boolean;
  provider?: 'google' | 'facebook' | 'email';
  avatarUrl?: string;
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  city: string;
  category: string;
  description: string;
  rating: number;
  location?: {
    lat: number;
    lng: number;
  };
  keywords?: string[]; 
  phone?: string;
  email?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  distanceKm?: number; // Added this property to fix the type error
}

export interface Candidate {
  id: string;
  name: string;
  photo: string;
  city: string;
  district: string;
  description: string;
  voteCount: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, provider: string) => void;
  logout: () => void;
  voteForCandidate: (candidateId: string) => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
  updateUser: (userUpdates: Partial<User>) => void;
  completeProfile: (profileData: any) => void;
}

export interface SubscriptionFeature {
  name: string;
  included: boolean;
}

export interface SubscriptionOption {
  id: SubscriptionPlan;
  name: string;
  price: number;
  features: SubscriptionFeature[];
  isPopular?: boolean;
}
