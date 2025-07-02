
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Calculator } from 'lucide-react';
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('#mobile-menu') && !target.closest('[aria-controls="mobile-menu"]')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    closeMenu();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50" role="banner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md p-1 transition-colors"
            aria-label="Go to homepage - Cloudways Calculator"
          >
            <Logo size="md" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" role="navigation" aria-label="Main navigation">
            <button
              onClick={() => scrollToSection('calculator')}
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-3 py-2"
              aria-label="Go to calculator section"
            >
              {t('nav.calculator') || 'Calculator'}
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-3 py-2"
              aria-label="Go to features section"
            >
              {t('nav.features') || 'Features'}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-3 py-2"
              aria-label="Go to pricing section"
            >
              {t('nav.pricing') || 'Pricing'}
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-3 py-2"
              aria-label="Go to FAQ section"
            >
              {t('nav.faq') || 'FAQ'}
            </button>
          </nav>
          
          {/* Desktop CTA & Language Selector */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <LanguageSelector />
            <Button
              onClick={() => scrollToSection('calculator')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 lg:px-6 py-2 transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
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
              className="p-2 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 border-gray-300"
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
        <div 
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
          role="navigation"
          aria-label="Mobile navigation"
          onKeyDown={handleKeyDown}
        >
          <div className="pt-4 border-t border-gray-200 space-y-1">
            <button
              onClick={() => scrollToSection('calculator')}
              className="block w-full text-left text-gray-600 hover:text-emerald-600 hover:bg-gray-50 font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Go to calculator section"
            >
              {t('nav.calculator') || 'Calculator'}
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left text-gray-600 hover:text-emerald-600 hover:bg-gray-50 font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Go to features section"
            >
              {t('nav.features') || 'Features'}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="block w-full text-left text-gray-600 hover:text-emerald-600 hover:bg-gray-50 font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Go to pricing section"
            >
              {t('nav.pricing') || 'Pricing'}
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left text-gray-600 hover:text-emerald-600 hover:bg-gray-50 font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Go to FAQ section"
            >
              {t('nav.faq') || 'FAQ'}
            </button>
            <div className="pt-3 mt-3 border-t border-gray-200">
              <Button
                onClick={() => scrollToSection('calculator')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
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
      </div>
    </header>
  );
};
