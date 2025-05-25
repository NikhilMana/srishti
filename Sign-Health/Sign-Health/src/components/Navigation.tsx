import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HelpCircle, Menu, X, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm fixed top-0 z-40 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-healthcare-700 dark:text-healthcare-400 font-bold text-xl">SignHealth</Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/features" className="text-gray-600 dark:text-gray-300 hover:text-healthcare-600 dark:hover:text-healthcare-400 px-3 py-2 text-sm font-medium">Features</Link>
            <Link to="/#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-healthcare-600 dark:hover:text-healthcare-400 px-3 py-2 text-sm font-medium">How It Works</Link>
            <Link to="/#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-healthcare-600 dark:hover:text-healthcare-400 px-3 py-2 text-sm font-medium">Testimonials</Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-healthcare-600 dark:hover:text-healthcare-400 px-3 py-2 text-sm font-medium">Contact</Link>
            <Link to="/support">
              <Button variant="ghost" size="sm" className="ml-4 text-gray-600 dark:text-gray-300 hover:text-healthcare-600 dark:hover:text-healthcare-400">
                <HelpCircle className="mr-2 h-4 w-4" />
                Support
              </Button>
            </Link>
            
            <ThemeToggle />
            
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="ml-4 text-healthcare-600 dark:text-healthcare-400 border-healthcare-200 dark:border-healthcare-700">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={signOut} 
                  className="ml-4 text-gray-600 dark:text-gray-300 hover:text-healthcare-600 dark:hover:text-healthcare-400"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button className="ml-4 bg-healthcare-600 hover:bg-healthcare-700 text-white">Sign In</Button>
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              onClick={toggleMenu}
              className="text-gray-600 dark:text-gray-300 hover:text-healthcare-600 dark:hover:text-healthcare-400"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 pt-2 pb-4 px-4 border-t border-gray-200 dark:border-gray-800">
          <div className="space-y-1">
            <Link to="/features" className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-healthcare-50 dark:hover:bg-healthcare-900/20 hover:text-healthcare-600 dark:hover:text-healthcare-400 rounded-md">Features</Link>
            <Link to="/#how-it-works" className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-healthcare-50 dark:hover:bg-healthcare-900/20 hover:text-healthcare-600 dark:hover:text-healthcare-400 rounded-md">How It Works</Link>
            <Link to="/#testimonials" className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-healthcare-50 dark:hover:bg-healthcare-900/20 hover:text-healthcare-600 dark:hover:text-healthcare-400 rounded-md">Testimonials</Link>
            <Link to="/contact" className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-healthcare-50 dark:hover:bg-healthcare-900/20 hover:text-healthcare-600 dark:hover:text-healthcare-400 rounded-md">Contact</Link>
            <Link to="/support">
              <Button variant="ghost" size="sm" className="w-full justify-start mt-2 text-gray-600 dark:text-gray-300 hover:text-healthcare-600 dark:hover:text-healthcare-400">
                <HelpCircle className="mr-2 h-4 w-4" />
                Support
              </Button>
            </Link>
            <div className="pt-4">
              {user ? (
                <>
                  <Link to="/dashboard" className="block mb-2">
                    <Button variant="outline" className="w-full justify-center text-healthcare-600 dark:text-healthcare-400 border-healthcare-200 dark:border-healthcare-700">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    onClick={signOut} 
                    className="w-full justify-center text-gray-600 dark:text-gray-300"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/auth">
                  <Button className="w-full bg-healthcare-600 hover:bg-healthcare-700 text-white">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
