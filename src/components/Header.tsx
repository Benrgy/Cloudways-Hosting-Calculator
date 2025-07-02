
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Calculator, Globe } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50" role="banner">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md p-1"
            aria-label="Go to homepage - Cloudways Calculator"
          >
            <Logo size="md" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <Link 
              to="/#calculator" 
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Go to calculator section"
            >
              {t('nav.calculator') || 'Calculator'}
            </Link>
            <Link 
              to="/#features" 
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Go to features section"
            >
              {t('nav.features') || 'Features'}
            </Link>
            <Link 
              to="/#pricing" 
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Go to pricing section"
            >
              {t('nav.pricing') || 'Pricing'}
            </Link>
            <Link 
              to="/#faq" 
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Go to FAQ section"
            >
              {t('nav.faq') || 'FAQ'}
            </Link>
          </nav>
          
          {/* Desktop CTA & Language Selector */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Button
              onClick={() => {
                const calculatorElement = document.getElementById('calculator');
                if (calculatorElement) {
                  calculatorElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-describedby="cta-description"
            >
              <Calculator className="w-4 h-4 mr-2" aria-hidden="true" />
              {t('nav.getStarted') || 'Get Started'}
            </Button>
            <span id="cta-description" className="sr-only">
              Navigate to calculator to start calculating your hosting savings
            </span>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <Button
              onClick={toggleMenu}
              variant="outline"
              size="sm"
              className="focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden border-t border-gray-200 py-4 bg-white"
            role="navigation"
            aria-label="Mobile navigation"
            onKeyDown={handleKeyDown}
          >
            <div className="space-y-4">
              <Link 
                to="/#calculator" 
                className="block text-gray-600 hover:text-emerald-600 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2"
                onClick={closeMenu}
                aria-label="Go to calculator section"
              >
                {t('nav.calculator') || 'Calculator'}
              </Link>
              <Link 
                to="/#features" 
                className="block text-gray-600 hover:text-emerald-600 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2"
                onClick={closeMenu}
                aria-label="Go to features section"
              >
                {t('nav.features') || 'Features'}
              </Link>
              <Link 
                to="/#pricing" 
                className="block text-gray-600 hover:text-emerald-600 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2"
                onClick={closeMenu}
                aria-label="Go to pricing section"
              >
                {t('nav.pricing') || 'Pricing'}
              </Link>
              <Link 
                to="/#faq" 
                className="block text-gray-600 hover:text-emerald-600 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2"
                onClick={closeMenu}
                aria-label="Go to FAQ section"
              >
                {t('nav.faq') || 'FAQ'}
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <Button
                  onClick={() => {
                    const calculatorElement = document.getElementById('calculator');
                    if (calculatorElement) {
                      calculatorElement.scrollIntoView({ behavior: 'smooth' });
                    }
                    closeMenu();
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  aria-describedby="mobile-cta-description"
                >
                  <Calculator className="w-4 h-4 mr-2" aria-hidden="true" />
                  {t('nav.getStarted') || 'Get Started'}
                </Button>
                <span id="mobile-cta-description" className="sr-only">
                  Navigate to calculator to start calculating your hosting savings
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
