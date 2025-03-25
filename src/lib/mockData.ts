
import { Vendor, User, Candidate } from './types';

// Placeholder image for vendors without a logo
export const placeholderImage = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000&auto=format&fit=crop';

export const categories = [
  'Technology',
  'Finance',
  'Healthcare',
  'Retail',
  'Food',
  'Education',
  'Transportation',
  'Energy',
  'Entertainment',
  'Construction',
];

export const districts = [
  'North',
  'South',
  'East',
  'West',
  'Central'
];

export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'TechNova Solutions',
    logo: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000&auto=format&fit=crop',
    city: 'San Francisco',
    category: 'Technology',
    description: 'Providing cutting-edge software solutions for modern business challenges.',
    location: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: '2',
    name: 'FinEdge Capital',
    logo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&auto=format&fit=crop',
    city: 'New York',
    category: 'Finance',
    description: 'Financial services with a focus on technology and innovation.',
    location: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: '3',
    name: 'Healthify',
    logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    city: 'Boston',
    category: 'Healthcare',
    description: 'Digital health solutions that improve patient care and outcomes.',
    location: { lat: 42.3601, lng: -71.0589 }
  },
  {
    id: '4',
    name: 'RetailPro',
    logo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop',
    city: 'Chicago',
    category: 'Retail',
    description: 'Innovative retail solutions for the modern shopper experience.',
    location: { lat: 41.8781, lng: -87.6298 }
  },
  {
    id: '5',
    name: 'FoodDelight',
    logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
    city: 'Austin',
    category: 'Food',
    description: 'Farm-to-table food services with a commitment to sustainability.',
    location: { lat: 30.2672, lng: -97.7431 }
  },
  {
    id: '6',
    name: 'EduTech',
    logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
    city: 'Seattle',
    category: 'Education',
    description: 'Educational technology solutions that transform the learning experience.',
    location: { lat: 47.6062, lng: -122.3321 }
  },
  {
    id: '7',
    name: 'TransportX',
    logo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1000&auto=format&fit=crop',
    city: 'Denver',
    category: 'Transportation',
    description: 'Next-generation transportation solutions for urban mobility.',
    location: { lat: 39.7392, lng: -104.9903 }
  },
  {
    id: '8',
    name: 'GreenEnergy',
    logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop',
    city: 'Portland',
    category: 'Energy',
    description: 'Renewable energy solutions for a sustainable future.',
    location: { lat: 45.5051, lng: -122.6750 }
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

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'John Smith',
    photo: placeholderImage,
    city: 'New York',
    district: 'North',
    description: 'Experienced leader with a focus on community development.',
    voteCount: 42
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    photo: placeholderImage,
    city: 'Chicago',
    district: 'South',
    description: 'Dedicated to improving local infrastructure and services.',
    voteCount: 38
  },
  {
    id: '3',
    name: 'Michael Brown',
    photo: placeholderImage,
    city: 'Los Angeles',
    district: 'West',
    description: 'Committed to sustainable urban development and green initiatives.',
    voteCount: 29
  },
  {
    id: '4',
    name: 'Emily Davis',
    photo: placeholderImage,
    city: 'Boston',
    district: 'East',
    description: 'Advocate for education reform and youth programs.',
    voteCount: 35
  },
  {
    id: '5',
    name: 'Robert Wilson',
    photo: placeholderImage,
    city: 'Denver',
    district: 'Central',
    description: 'Working to bring economic opportunities to the community.',
    voteCount: 31
  }
];
