
import { Candidate, User } from './types';

// Placeholder image for candidates without a photo
export const placeholderImage = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop';

export const districts = [
  'North',
  'South',
  'East',
  'West',
  'Central',
];

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop',
    city: 'San Francisco',
    district: 'North',
    description: 'Dedicated to creating sustainable infrastructure and green spaces throughout the city.',
    voteCount: 127,
  },
  {
    id: '2',
    name: 'Michael Chen',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
    city: 'San Francisco',
    district: 'South',
    description: 'Focused on economic development and supporting small businesses across the district.',
    voteCount: 92,
  },
  {
    id: '3',
    name: 'Sophia Rodriguez',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop',
    city: 'San Francisco',
    district: 'East',
    description: 'Advocating for better public transportation and urban planning initiatives.',
    voteCount: 108,
  },
  {
    id: '4',
    name: 'James Wilson',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    city: 'San Francisco',
    district: 'West',
    description: 'Working to improve educational facilities and opportunities for all residents.',
    voteCount: 85,
  },
  {
    id: '5',
    name: 'Olivia Kim',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
    city: 'San Francisco',
    district: 'Central',
    description: 'Committed to affordable housing and reducing homelessness in our community.',
    voteCount: 142,
  },
  {
    id: '6',
    name: 'William Lee',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
    city: 'San Francisco',
    district: 'North',
    description: 'Promoting arts and cultural programs to enrich our neighborhoods and inspire creativity.',
    voteCount: 76,
  },
  {
    id: '7',
    name: 'Isabella Martinez',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1000&auto=format&fit=crop',
    city: 'San Francisco',
    district: 'South',
    description: 'Dedicated to public safety reforms and community-oriented policing approaches.',
    voteCount: 113,
  },
  {
    id: '8',
    name: 'Ethan Davis',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop',
    city: 'San Francisco',
    district: 'East',
    description: 'Working on environmental protection and sustainable development initiatives.',
    voteCount: 94,
  },
];

export const mockAdminUser: User = {
  id: 'admin1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  hasVoted: false,
};

export const mockVisitorUser: User = {
  id: 'visitor1',
  name: 'Visitor User',
  email: 'visitor@example.com',
  role: 'visitor',
  hasVoted: false,
};
