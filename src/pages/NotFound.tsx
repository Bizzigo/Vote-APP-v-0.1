
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center py-16">
        <div className="animate-pulse mb-8">
          <h1 className="text-9xl font-bold text-accent">404</h1>
        </div>
        <h2 className="text-3xl font-semibold mt-2 mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          The page you are looking for doesn't exist or has been moved to another URL.
        </p>
        <Link to="/">
          <Button className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Return to Home
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
