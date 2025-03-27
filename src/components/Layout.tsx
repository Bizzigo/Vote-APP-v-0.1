
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import MovingCircles from './MovingCircles';
import SearchBar from './SearchBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col w-full bg-background text-foreground overflow-x-hidden relative">
      <MovingCircles />
      <Navbar />
      <main className="flex-1 w-full relative z-10 max-w-screen-xl mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
