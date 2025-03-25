
import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

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
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Bizzigo Pro SIA • All rights reserved
            </p>
            <Link to="/privacy" className="text-sm text-accent hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
