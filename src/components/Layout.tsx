
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
      
      {/* Add search bar below navbar for all pages */}
      <div className="w-full py-6 bg-white/50 backdrop-blur-sm border-b border-border/10 relative z-10">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <SearchBar 
            searchTerm="" 
            setSearchTerm={() => {}} 
            onSearch={() => {}} 
            className="w-full max-w-xl mx-auto" 
          />
        </div>
      </div>
      
      <main className="flex-1 w-full relative z-10 max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
