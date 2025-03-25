
export type Role = 'admin' | 'visitor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  hasVoted: boolean;
  votedFor?: string;
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  city: string;
  category: string;
  description: string;
  location?: {
    lat: number;
    lng: number;
  };
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
}
