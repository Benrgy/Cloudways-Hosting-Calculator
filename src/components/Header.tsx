
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MHC</span>
            </div>
            <span className="font-bold text-xl text-gray-900">MigrateHostingCalculator</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t('header.features')}
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t('header.howItWorks')}
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t('header.faq')}
            </button>
            <button 
              onClick={() => scrollToSection('calculator')}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t('header.calculator')}
            </button>
            <a 
              href="https://www.cloudways.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t('header.cloudwaysHosting')}
            </a>
            <LanguageSelector />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-primary transition-colors text-left"
              >
                {t('header.features')}
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-600 hover:text-primary transition-colors text-left"
              >
                {t('header.howItWorks')}
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-600 hover:text-primary transition-colors text-left"
              >
                {t('header.faq')}
              </button>
              <button 
                onClick={() => scrollToSection('calculator')}
                className="text-gray-600 hover:text-primary transition-colors text-left"
              >
                {t('header.calculator')}
              </button>
              <a 
                href="https://www.cloudways.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.cloudwaysHosting')}
              </a>
              <div className="pt-2 border-t">
                <LanguageSelector />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
