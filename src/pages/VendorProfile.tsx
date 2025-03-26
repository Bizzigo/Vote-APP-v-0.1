import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { mockVendors } from '@/lib/mockData';
import { Vendor } from '@/lib/types';
import SearchBar from '@/components/SearchBar';

import VendorHeader from '@/components/vendor/VendorHeader';
import VendorContactInfoCard from '@/components/vendor/VendorContactInfoCard';
import VendorPaymentInfoCard from '@/components/vendor/VendorPaymentInfoCard';
import VendorDescriptionCard from '@/components/vendor/VendorDescriptionCard';
import VendorServiceTabs from '@/components/vendor/VendorServiceTabs';
import VendorKeywordsCard from '@/components/vendor/VendorKeywordsCard';
import { Badge } from '@/components/ui/badge';
import { MessageSquare } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

const VendorProfile = () => {
  const params = useParams<{ vendorSlug: string }>();
  const vendorSlug = params.vendorSlug;
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const reviewsSectionRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
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
  
  const paymentMethods = React.useMemo(() => {
    return {
      creditCard: Math.random() > 0.4,
      bankTransfer: Math.random() > 0.3,
      paypal: Math.random() > 0.5,
      crypto: Math.random() > 0.7
    };
  }, [vendorSlug]);
  
  const contactMethods = React.useMemo(() => {
    return {
      hasPhone: Math.random() > 0.3,
      hasWhatsapp: Math.random() > 0.4,
      hasTelegram: Math.random() > 0.5,
      hasInstagram: Math.random() > 0.4,
      hasFacebook: Math.random() > 0.3,
      hasWebsite: Math.random() > 0.2,
      hasLursoftProfile: Math.random() > 0.5,
    };
  }, [vendorSlug]);
  
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
  
  const averageRating = React.useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }, [reviews]);
  
  const registrationNumber = React.useMemo(() => 
    `LV${Math.floor(10000000 + Math.random() * 90000000)}`, []);
  const registrationDate = React.useMemo(() => 
    new Date(Date.now() - Math.floor(Math.random() * 5 * 365 * 24 * 60 * 60 * 1000))
      .toLocaleDateString('en-GB'), []);
  const reviewCount = React.useMemo(() => reviews.length, [reviews]);
  const isOnline = React.useMemo(() => Math.random() > 0.5, []);

  const scrollToReviews = () => {
    if (reviewsSectionRef.current) {
      reviewsSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSearch = (query: string, useLocation: boolean, distanceKm?: number) => {
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-xl">Loading vendor profile...</p>
        </div>
      </Layout>
    );
  }
  
  if (notFound || !vendor) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center h-[70vh] space-y-4">
          <p className="text-xl">Vendor not found</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <VendorHeader
          vendor={{...vendor, rating: averageRating || vendor.rating}}
          registrationNumber={registrationNumber}
          registrationDate={registrationDate}
          reviewCount={reviewCount}
          hasLursoftProfile={contactMethods.hasLursoftProfile}
          jobVacancies={jobVacancies.length}
          hasShop={shopItems.length > 0}
          isOnline={isOnline}
          onRatingClick={scrollToReviews}
        />

        <div className="flex justify-center w-full my-8">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            onSearch={handleSearch} 
            className="w-full max-w-xl" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <VendorDescriptionCard vendor={vendor} />
          </div>
          <div>
            <VendorContactInfoCard vendorId={vendor.id} contactMethods={contactMethods} />
          </div>
        </div>

        <div className="mb-6">
          <VendorServiceTabs
            services={services}
            jobVacancies={jobVacancies}
            shopItems={shopItems}
            reviews={reviews}
            ref={reviewsSectionRef}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VendorPaymentInfoCard paymentMethods={paymentMethods} />
          <VendorKeywordsCard services={services} />
        </div>
      </div>
    </Layout>
  );
};

export default VendorProfile;
