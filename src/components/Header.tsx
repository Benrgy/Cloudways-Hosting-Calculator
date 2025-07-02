
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Logo } from '@/components/Logo';

export const Header = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50" role="banner">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <button
              onClick={() => scrollToSection('calculator')}
              className="text-gray-600 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Go to calculator section"
            >
              {t('nav.calculator') || 'Calculator'}
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Go to features section"
            >
              {t('nav.features') || 'Features'}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-600 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Go to pricing section"
            >
              {t('nav.pricing') || 'Pricing'}
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-600 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Go to FAQ section"
            >
              {t('nav.faq') || 'FAQ'}
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://platform.cloudways.com/signup', '_blank')}
              className="focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Sign in to Cloudways platform"
            >
              {t('nav.signIn') || 'Sign In'}
            </Button>
            <Button 
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              onClick={() => window.open('https://platform.cloudways.com/signup', '_blank')}
              aria-label="Start free trial with Cloudways"
            >
              {t('nav.startTrial') || 'Start Free Trial'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-gray-200 py-4" role="navigation" aria-label="Mobile navigation">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('calculator')}
                className="text-left text-gray-600 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
                aria-label="Go to calculator section"
              >
                {t('nav.calculator') || 'Calculator'}
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-left text-gray-600 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
                aria-label="Go to features section"
              >
                {t('nav.features') || 'Features'}
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-left text-gray-600 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
                aria-label="Go to pricing section"
              >
                {t('nav.pricing') || 'Pricing'}
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left text-gray-600 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
                aria-label="Go to FAQ section"
              >
                {t('nav.faq') || 'FAQ'}
              </button>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <LanguageSelector />
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('https://platform.cloudways.com/signup', '_blank')}
                    className="focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    aria-label="Sign in to Cloudways platform"
                  >
                    {t('nav.signIn') || 'Sign In'}
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    onClick={() => window.open('https://platform.cloudways.com/signup', '_blank')}
                    aria-label="Start free trial with Cloudways"
                  >
                    {t('nav.startTrial') || 'Start Free Trial'}
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
