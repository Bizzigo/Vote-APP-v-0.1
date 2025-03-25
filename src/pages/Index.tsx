
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import RecentVendors from '@/components/RecentVendors';
import TopSearched from '@/components/TopSearched';
import CategoryCloud from '@/components/CategoryCloud';
import { mockVendors } from '@/lib/mockData';
import { Vendor } from '@/lib/types';

const Index = () => {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Vendor Directory
          </h1>
          <p className="text-muted-foreground animate-fade-in animation-delay-150">
            Find the perfect vendors for your business needs. Search by name, category, or location.
          </p>
        </div>
        
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <RecentVendors />
        
        <TopSearched />
        
        <CategoryCloud />
      </div>
    </Layout>
  );
};

export default Index;
