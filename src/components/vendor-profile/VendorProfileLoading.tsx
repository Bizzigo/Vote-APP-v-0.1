
import React from 'react';
import Layout from '@/components/Layout';

const VendorProfileLoading: React.FC = () => {
  return (
    <Layout hideBreadcrumbs={true}>
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl">Loading vendor profile...</p>
      </div>
    </Layout>
  );
};

export default VendorProfileLoading;
