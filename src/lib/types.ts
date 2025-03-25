
export type Role = 'admin' | 'visitor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  hasVoted: boolean;
  votedFor?: string;
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
  login: (email: string, role: Role) => void;
  logout: () => void;
  voteForCandidate: (candidateId: string) => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
}
