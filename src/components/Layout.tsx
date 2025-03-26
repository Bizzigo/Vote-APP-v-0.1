
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col w-full bg-background text-foreground">
      <Navbar />
      <main className="flex-1 w-full">
        {!isHomePage && (
          <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
            <Breadcrumbs />
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
