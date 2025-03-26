
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { mockVendors } from '@/lib/mockData';
import { Vendor } from '@/lib/types';

export interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

export interface UseVendorDataReturn {
  vendor: Vendor | null;
  loading: boolean;
  notFound: boolean;
  services: string[];
  jobVacancies: { id: number; title: string; location: string; type: string; }[];
  shopItems: { id: number; name: string; price: string; description: string; }[];
  reviews: Review[];
  paymentMethods: {
    creditCard: boolean;
    bankTransfer: boolean;
    paypal: boolean;
    crypto: boolean;
  };
  contactMethods: {
    hasPhone: boolean;
    hasWhatsapp: boolean;
    hasTelegram: boolean;
    hasInstagram: boolean;
    hasFacebook: boolean;
    hasWebsite: boolean;
    hasLursoftProfile: boolean;
  };
  averageRating: number;
  registrationNumber: string;
  registrationDate: string;
  reviewCount: number;
  isOnline: boolean;
}

export const useVendorData = (vendorSlug: string | undefined): UseVendorDataReturn => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();
  
  const [services, setServices] = useState<string[]>([
    'Web Development', 'Mobile Apps', 'Cloud Services', 'Consulting', 
    'UI/UX Design', 'DevOps', 'Data Analytics', 'AI Solutions', 
    'IT Infrastructure', 'Cybersecurity'
  ]);
  
  const [jobVacancies] = useState([
    { id: 1, title: 'Frontend Developer', location: 'Remote', type: 'Full-time' },
    { id: 2, title: 'Backend Engineer', location: 'Riga', type: 'Full-time' },
    { id: 3, title: 'UI/UX Designer', location: 'Hybrid', type: 'Part-time' },
  ]);
  
  const [shopItems] = useState([
    { id: 1, name: 'Premium Support Package', price: '€499', description: 'Priority technical support with 24/7 availability' },
    { id: 2, name: 'Website Audit', price: '€299', description: 'Comprehensive analysis of your website performance and SEO' },
    { id: 3, name: 'Custom Integration', price: '€1299', description: 'Custom API and third-party service integration' },
  ]);

  const [reviews] = useState<Review[]>([
    {
      id: 1,
      author: 'John Doe',
      date: '15 May 2023',
      rating: 4.5,
      comment: 'Great service and professional team. Would recommend for any business looking for quality development work.'
    },
    {
      id: 2,
      author: 'Maria Garcia',
      date: '3 April 2023',
      rating: 5,
      comment: 'Exceeded our expectations in every way. The project was delivered on time and the results are amazing.'
    },
    {
      id: 3,
      author: 'Alex Johnson',
      date: '22 February 2023',
      rating: 3.5,
      comment: 'Good work overall, but communication could have been better at times. The final product met our requirements.'
    },
    {
      id: 4,
      author: 'Sarah Williams',
      date: '10 January 2023',
      rating: 4.8,
      comment: 'Very responsive team that understood our requirements quickly. The solution they delivered was perfect for our needs.'
    },
    {
      id: 5,
      author: 'David Chen',
      date: '29 December 2022',
      rating: 4.2,
      comment: 'Solid work and met all our requirements. Would use their services again for future projects.'
    },
    {
      id: 6,
      author: 'Emma Thompson',
      date: '15 November 2022',
      rating: 5,
      comment: 'Absolutely fantastic service from start to finish. The team went above and beyond to ensure our satisfaction.'
    },
    {
      id: 7,
      author: 'Michael Brown',
      date: '23 October 2022',
      rating: 3.8,
      comment: 'Good technical skills but project timeline was slightly delayed. End product works well for our needs.'
    },
    {
      id: 8,
      author: 'Jessica Lee',
      date: '5 September 2022',
      rating: 4.7,
      comment: 'Very professional team with great attention to detail. They were responsive to all our feedback during development.'
    }
  ].sort((a, b) => {
    const dateA = new Date(a.date.split(' ').reverse().join(' '));
    const dateB = new Date(b.date.split(' ').reverse().join(' '));
    return dateB.getTime() - dateA.getTime();
  }));
  
  const paymentMethods = {
    creditCard: Math.random() > 0.4,
    bankTransfer: Math.random() > 0.3,
    paypal: Math.random() > 0.5,
    crypto: Math.random() > 0.7
  };
  
  const contactMethods = {
    hasPhone: Math.random() > 0.3,
    hasWhatsapp: Math.random() > 0.4,
    hasTelegram: Math.random() > 0.5,
    hasInstagram: Math.random() > 0.4,
    hasFacebook: Math.random() > 0.3,
    hasWebsite: Math.random() > 0.2,
    hasLursoftProfile: Math.random() > 0.5,
  };
  
  useEffect(() => {
    const fetchVendor = () => {
      setLoading(true);
      
      if (!vendorSlug) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      
      console.log("Fetching vendor with slug:", vendorSlug);
      console.log("Available vendors:", mockVendors);
      
      let foundVendor = mockVendors.find(v => v.id === vendorSlug);
      
      if (!foundVendor) {
        foundVendor = mockVendors.find(v => {
          const vendorNameSlug = v.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          return vendorNameSlug === vendorSlug;
        });
      }
      
      if (foundVendor) {
        console.log("Found vendor:", foundVendor);
        setVendor(foundVendor);
        
        if (foundVendor.keywords && foundVendor.keywords.length > 0) {
          setServices(foundVendor.keywords);
        }
        
        toast({
          title: "Vendor loaded",
          description: `Viewing ${foundVendor.name}`
        });
      } else {
        console.log("Vendor not found");
        setNotFound(true);
        toast({
          title: "Vendor not found",
          description: "Could not find the requested vendor",
          variant: "destructive"
        });
      }
      
      setLoading(false);
    };
    
    fetchVendor();
  }, [vendorSlug, toast]);
  
  const averageRating = reviews.length === 0 ? 0 : 
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  const registrationNumber = `LV${Math.floor(10000000 + Math.random() * 90000000)}`;
  const registrationDate = new Date(Date.now() - Math.floor(Math.random() * 5 * 365 * 24 * 60 * 60 * 1000))
    .toLocaleDateString('en-GB');
  const reviewCount = reviews.length;
  const isOnline = Math.random() > 0.5;

  return {
    vendor,
    loading,
    notFound,
    services,
    jobVacancies,
    shopItems,
    reviews,
    paymentMethods,
    contactMethods,
    averageRating,
    registrationNumber,
    registrationDate,
    reviewCount,
    isOnline
  };
};
