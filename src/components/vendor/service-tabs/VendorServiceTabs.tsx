
import React, { forwardRef } from 'react';
import ServicesTab from './ServicesTab';
import ReviewsTab from './ReviewsTab';
import JobsTab from './JobsTab';
import ShopTab from './ShopTab';

interface Service {
  name: string;
  description?: string;
}

interface JobVacancy {
  id: number;
  title: string;
  location: string;
  type: string;
}

interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

interface VendorServiceTabsProps {
  services: string[];
  jobVacancies: JobVacancy[];
  shopItems: ShopItem[];
  reviews?: Review[];
}

const VendorServiceTabs = forwardRef<HTMLDivElement, VendorServiceTabsProps>(({
  services,
  jobVacancies,
  shopItems,
  reviews = [],
}, ref) => {
  return (
    <div className="space-y-6">
      <ServicesTab services={services} />
      <ReviewsTab reviews={reviews} ref={ref} />
      <JobsTab jobVacancies={jobVacancies} />
      <ShopTab shopItems={shopItems} />
    </div>
  );
});

VendorServiceTabs.displayName = 'VendorServiceTabs';

export default VendorServiceTabs;
