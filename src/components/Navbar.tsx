
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { title: 'Home', href: '/' },
    ...(isAdmin ? [{ title: 'Admin Panel', href: '/admin' }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden bg-accent rounded-sm">
              <div className="absolute inset-0 flex items-center justify-center text-accent-foreground font-semibold">
                VP
              </div>
            </div>
            <span className="text-lg font-medium">Voting Portal</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm transition-colors hover:text-accent ${
                location.pathname === link.href
                  ? 'text-accent font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">
                Hello, <span className="font-medium">{user?.name}</span>
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                Log Out
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm">Log In</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block py-2 text-base ${
                  location.pathname === link.href
                    ? 'text-accent font-medium'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            {isLoggedIn ? (
              <div className="py-2 border-t border-border/60 mt-2">
                <span className="block text-sm mb-2">
                  Hello, <span className="font-medium">{user?.name}</span>
                </span>
                <Button variant="outline" size="sm" onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}>
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="py-2 border-t border-border/60 mt-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm">Log In</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
