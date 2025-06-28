
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-emerald-600">
            Cloudways Calculator
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-emerald-600 transition-colors">
              {t('header.features')}
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-emerald-600 transition-colors">
              {t('header.howItWorks')}
            </a>
            <a href="#faq" className="text-gray-600 hover:text-emerald-600 transition-colors">
              {t('header.faq')}
            </a>
            <a href="#calculator" className="text-gray-600 hover:text-emerald-600 transition-colors">
              {t('header.calculator')}
            </a>
            <LanguageSelector />
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              {t('header.startFreeTrial')}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSelector />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-emerald-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-4">
            <a 
              href="#features" 
              className="block text-gray-600 hover:text-emerald-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.features')}
            </a>
            <a 
              href="#how-it-works" 
              className="block text-gray-600 hover:text-emerald-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.howItWorks')}
            </a>
            <a 
              href="#faq" 
              className="block text-gray-600 hover:text-emerald-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.faq')}
            </a>
            <a 
              href="#calculator" 
              className="block text-gray-600 hover:text-emerald-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.calculator')}
            </a>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              {t('header.startFreeTrial')}
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};
