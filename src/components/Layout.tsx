
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {children}
      </main>
      <footer className="py-6 border-t border-border/40 mt-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Voting Portal • All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
