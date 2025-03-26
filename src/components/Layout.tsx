
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import MovingCircles from './MovingCircles';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLegalPage = ['/cookies', '/privacy', '/terms'].includes(location.pathname);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col w-full bg-background text-foreground overflow-x-hidden relative">
      <MovingCircles />
      <Navbar />
      <main className="flex-1 w-full relative z-10">
        {!isHomePage && !isLegalPage && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
