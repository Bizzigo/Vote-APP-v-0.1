
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Menu, X, MapPin, User, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Navbar: React.FC = () => {
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationActive, setLocationActive] = useState(false);
  const { toast: uiToast } = useToast();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleLocation = () => {
    if (!locationActive) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationActive(true);
            uiToast({
              title: "Location accessed",
              description: "Using your current location",
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            uiToast({
              title: "Location error",
              description: "Could not access your location",
              variant: "destructive",
            });
          }
        );
      } else {
        uiToast({
          title: "Location not supported",
          description: "Your browser doesn't support geolocation",
          variant: "destructive",
        });
      }
    } else {
      setLocationActive(false);
      uiToast({
        title: "Location disabled",
        description: "No longer using your location",
      });
    }
  };

  const navLinks = [
    ...(isLoggedIn ? [{ title: 'Profile', href: '/profile' }] : []),
    ...(isAdmin ? [{ title: 'Admin Panel', href: '/admin' }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold text-primary">Bizzigo</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm transition-colors hover:text-primary ${
                location.pathname === link.href
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLocation}
            className="flex items-center justify-center h-8 w-8 rounded-full transition-colors hover:bg-secondary"
            aria-label="Toggle location"
          >
            <MapPin 
              className={`h-5 w-5 transition-colors ${
                locationActive ? 'text-primary fill-primary/20' : 'text-muted-foreground'
              }`} 
            />
          </button>
          
          {!isLoggedIn && (
            <Link to="/signup">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                Sign Up
              </Button>
            </Link>
          )}
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2 text-sm">
                <User size={16} className="text-primary" />
                <span>
                  Hello, <span className="font-medium">{user?.name}</span>
                </span>
              </Link>
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
          {mobileMenuOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
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
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            
            <div className="flex items-center py-2">
              <button
                onClick={toggleLocation}
                className="flex items-center gap-2 py-2"
                aria-label="Toggle location"
              >
                <MapPin 
                  className={`h-5 w-5 ${
                    locationActive ? 'text-primary fill-primary/20' : 'text-muted-foreground'
                  }`} 
                />
                <span className="text-sm">
                  {locationActive ? 'Location active' : 'Use my location'}
                </span>
              </button>
            </div>
            
            {!isLoggedIn && (
              <div className="py-2">
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4 text-primary" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
            
            {isLoggedIn ? (
              <div className="py-2 border-t border-border mt-2">
                <Link to="/profile" className="flex items-center gap-2 mb-2" onClick={() => setMobileMenuOpen(false)}>
                  <User size={16} className="text-primary" />
                  <span className="text-sm">
                    Hello, <span className="font-medium">{user?.name}</span>
                  </span>
                </Link>
                <Button variant="outline" size="sm" onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}>
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="py-2 border-t border-border mt-2">
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
