import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { mockVendors } from '@/lib/mockData';
import { Vendor } from '@/lib/types';

import VendorHeader from '@/components/vendor/VendorHeader';
import VendorContactInfoCard from '@/components/vendor/VendorContactInfoCard';
import VendorPaymentInfoCard from '@/components/vendor/VendorPaymentInfoCard';
import VendorDescriptionCard from '@/components/vendor/VendorDescriptionCard';
import VendorServiceTabs from '@/components/vendor/VendorServiceTabs';

const VendorProfile = () => {
  const params = useParams<{ id: string }>();
  const id = params.id; // Get the actual ID parameter
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();
  
  const [services] = useState<string[]>([
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
  
  const paymentMethods = React.useMemo(() => {
    return {
      creditCard: Math.random() > 0.4,
      bankTransfer: Math.random() > 0.3,
      paypal: Math.random() > 0.5,
      crypto: Math.random() > 0.7
    };
  }, [id]);
  
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
  }, [id]);
  
  useEffect(() => {
    const fetchVendor = () => {
      setLoading(true);
      
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      
      console.log("Fetching vendor with ID:", id);
      console.log("Available vendors:", mockVendors);
      
      const foundVendor = mockVendors.find(v => v.id === id);
      
      if (foundVendor) {
        console.log("Found vendor:", foundVendor);
        setVendor(foundVendor);
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
  }, [id, toast]);
  
  const registrationNumber = React.useMemo(() => 
    `LV${Math.floor(10000000 + Math.random() * 90000000)}`, []);
  const registrationDate = React.useMemo(() => 
    new Date(Date.now() - Math.floor(Math.random() * 5 * 365 * 24 * 60 * 60 * 1000))
      .toLocaleDateString('en-GB'), []);
  const reviewCount = React.useMemo(() => Math.floor(Math.random() * 500) + 50, []);
  const isOnline = React.useMemo(() => Math.random() > 0.5, []);

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
          <Link to="/" className="text-blue-600 hover:underline flex items-center gap-2">
            <ArrowLeft size={16} />
            Return to Home
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors">
          <ArrowLeft size={16} />
          <span>Back to vendors</span>
        </Link>

        <VendorHeader
          vendor={vendor}
          registrationNumber={registrationNumber}
          registrationDate={registrationDate}
          reviewCount={reviewCount}
          hasLursoftProfile={contactMethods.hasLursoftProfile}
          jobVacancies={jobVacancies.length}
          hasShop={shopItems.length > 0}
          isOnline={isOnline}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <VendorContactInfoCard vendorId={vendor.id} contactMethods={contactMethods} />
          <VendorPaymentInfoCard paymentMethods={paymentMethods} />
        </div>

        <VendorDescriptionCard vendor={vendor} />

        <VendorServiceTabs
          services={services}
          jobVacancies={jobVacancies}
          shopItems={shopItems}
        />
      </div>
    </Layout>
  );
};

export default VendorProfile;
