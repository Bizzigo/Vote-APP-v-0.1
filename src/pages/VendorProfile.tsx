
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import VendorHeader from '@/components/vendor/VendorHeader';
import VendorProfileHeader from '@/components/vendor-profile/VendorProfileHeader';
import VendorProfileGrid from '@/components/vendor-profile/VendorProfileGrid';
import VendorProfileLoading from '@/components/vendor-profile/VendorProfileLoading';
import VendorProfileNotFound from '@/components/vendor-profile/VendorProfileNotFound';
import { useVendorData } from '@/hooks/useVendorData';

const VendorProfile: React.FC = () => {
  const params = useParams<{ vendorSlug: string }>();
  const vendorSlug = params.vendorSlug;
  const reviewsSectionRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const {
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
  } = useVendorData(vendorSlug);

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
    return <VendorProfileLoading />;
  }
  
  if (notFound || !vendor) {
    return <VendorProfileNotFound />;
  }
  
  return (
    <Layout hideBreadcrumbs={true}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <VendorProfileHeader 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />

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

        <VendorProfileGrid
          vendor={vendor}
          services={services}
          jobVacancies={jobVacancies}
          shopItems={shopItems}
          reviews={reviews}
          contactMethods={contactMethods}
          paymentMethods={paymentMethods}
          reviewsSectionRef={reviewsSectionRef}
        />
      </div>
    </Layout>
  );
};

export default VendorProfile;
