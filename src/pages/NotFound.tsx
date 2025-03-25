
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center py-16">
        <h1 className="text-9xl font-bold text-accent">404</h1>
        <h2 className="text-3xl font-semibold mt-6 mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
