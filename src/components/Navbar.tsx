
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const {
    isLoggedIn,
    user,
    logout
  } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isLoggedIn ? <div className="flex items-center gap-4">
              <Link to="/profile" className="text-foreground hover:text-primary transition-colors">
                Profile
              </Link>
              <button onClick={logout} className="text-foreground hover:text-primary transition-colors">
                Log Out
              </button>
            </div> : <div className="flex items-center gap-4">
              <Link to="/login" className="text-foreground hover:text-primary transition-colors">
                IENĀKT
              </Link>
              <Link to="/signup" className="text-primary font-medium hover:text-primary/80 transition-colors">
                PIEVIENOJIES
              </Link>
            </div>}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMobileMenu} aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}>
          {mobileMenuOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {isLoggedIn ? <>
                <Link to="/profile" className="block py-2 text-base text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </Link>
                <button onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }} className="block py-2 text-base text-muted-foreground w-full text-left">
                  Log Out
                </button>
              </> : <>
                <Link to="/login" className="block py-2 text-base text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                  Log In
                </Link>
                <Link to="/signup" className="block py-2 text-base text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </>}
          </div>
        </div>}
    </header>;
};

export default Navbar;
