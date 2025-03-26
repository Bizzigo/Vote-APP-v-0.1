
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, Home, LogIn, UserPlus, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const {
    isLoggedIn,
    user,
    logout
  } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-foreground/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <Home size={20} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isLoggedIn ? <div className="flex items-center gap-4">
              <Link to="/profile" className="text-foreground hover:text-primary transition-colors">
                {t("profile")}
              </Link>
              <button onClick={logout} className="text-foreground hover:text-primary transition-colors">
                {t("logout")}
              </button>
            </div> : <div className="flex items-center gap-6">
              <LanguageSwitcher />
              <button 
                onClick={toggleTheme} 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors flex items-center" 
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
              </button>
              <Link to="/login" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors flex items-center" aria-label="Log in">
                <LogIn size={20} strokeWidth={1.5} />
              </Link>
              <Link to="/signup" className="text-primary hover:text-primary/80 transition-colors flex items-center" aria-label="Sign up">
                <UserPlus size={20} strokeWidth={1.5} />
              </Link>
            </div>}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center" onClick={toggleMobileMenu} aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}>
          {mobileMenuOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <div className="flex items-center justify-between py-2">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-base text-muted-foreground"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={18} strokeWidth={1.5} />
                    <span>{t("lightMode")}</span>
                  </>
                ) : (
                  <>
                    <Moon size={18} strokeWidth={1.5} />
                    <span>{t("darkMode")}</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Language options in mobile menu */}
            <div className="flex items-center justify-between py-2 border-t border-border">
              <Link to="#" onClick={(e) => {
                e.preventDefault();
                const languageSwitcher = document.querySelector('#languageSwitcher');
                if (languageSwitcher instanceof HTMLElement) {
                  languageSwitcher.click();
                }
              }} className="flex items-center gap-2 text-base text-muted-foreground">
                <span>Language / Valoda</span>
              </Link>
              <div className="hidden">
                <LanguageSwitcher />
              </div>
            </div>
            
            {isLoggedIn ? <>
                <Link to="/profile" className="block py-2 text-base text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                  {t("profile")}
                </Link>
                <button onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }} className="block py-2 text-base text-muted-foreground w-full text-left">
                  {t("logout")}
                </button>
              </> : <>
                <Link to="/login" className="flex items-center gap-2 py-2 text-base text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                  <LogIn size={18} strokeWidth={1.5} />
                  <span>{t("login")}</span>
                </Link>
                <Link to="/signup" className="flex items-center gap-2 py-2 text-base text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                  <UserPlus size={18} strokeWidth={1.5} className="text-primary" />
                  <span>{t("signup")}</span>
                </Link>
              </>}
          </div>
        </div>}
    </header>;
};

export default Navbar;
