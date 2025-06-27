
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";
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

  const handleCloudwaysClick = () => {
    window.open('https://www.cloudways.com/en/?id=1384181&utm_source=calculator&utm_medium=header&utm_campaign=savings_calculator', '_blank');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link id="header-home" aria-label="Cloudways Savings Calculator Homepage" to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CW</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Cloudways Savings Calculator</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            <button 
              onClick={() => scrollToSection('features-section')}
              id="desktop-nav-features"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t('header.features')}
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works-section')}
              id="desktop-nav-howitworks"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t('header.howItWorks')}
            </button>
            <button 
              onClick={() => scrollToSection('faq-section')}
              id="desktop-nav-faq"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t('header.faq')}
            </button>
            <button 
              onClick={() => scrollToSection('calculator-section')}
              id="desktop-nav-calculator"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t('header.calculator')}
            </button>
            <button 
              onClick={handleCloudwaysClick}
              id="desktop-nav-cloudways"
              rel="sponsored noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              aria-label="Start Free Trial"
            >
              {t('header.startFreeTrial')}
            </button>
            <span aria-label="Language Selector" tabIndex={0}><LanguageSelector /></span>
          </nav>
          <button
            className="md:hidden"
            id="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title={isMenuOpen ? "Close Main Menu" : "Open Main Menu"}
            aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
          >
            <span className="sr-only">{isMenuOpen ? "Close main menu" : "Open main menu"}</span>
            {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <ChevronDown className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t" aria-label="Mobile Navigation">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('features-section')}
                id="mobile-nav-features"
                className="text-gray-600 hover:text-primary transition-colors text-left"
              >
                {t('header.features')}
              </button>
              <button
                onClick={() => scrollToSection('how-it-works-section')}
                id="mobile-nav-howitworks"
                className="text-gray-600 hover:text-primary transition-colors text-left"
              >
                {t('header.howItWorks')}
              </button>
              <button
                onClick={() => scrollToSection('faq-section')}
                id="mobile-nav-faq"
                className="text-gray-600 hover:text-primary transition-colors text-left"
              >
                {t('header.faq')}
              </button>
              <button
                onClick={() => scrollToSection('calculator-section')}
                id="mobile-nav-calculator"
                className="text-gray-600 hover:text-primary transition-colors text-left"
              >
                {t('header.calculator')}
              </button>
              <button
                onClick={handleCloudwaysClick}
                id="mobile-nav-cloudways"
                rel="sponsored noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-left"
                aria-label="Start Free Trial"
              >
                {t('header.startFreeTrial')}
              </button>
              <div className="pt-2 border-t">
                <span aria-label="Language Selector" tabIndex={0}><LanguageSelector /></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
