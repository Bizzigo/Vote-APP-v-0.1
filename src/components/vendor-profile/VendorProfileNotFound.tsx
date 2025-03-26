
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const VendorProfileNotFound: React.FC = () => {
  return (
    <Layout hideBreadcrumbs={true}>
      <div className="flex flex-col justify-center items-center h-[70vh] space-y-4">
        <p className="text-xl">Vendor not found</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    </Layout>
  );
};

export default VendorProfileNotFound;
