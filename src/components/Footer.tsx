
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">
              Cloudways Calculator
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer.product')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#calculator" className="hover:text-emerald-400 transition-colors">
                  {t('footer.calculator')}
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-emerald-400 transition-colors">
                  {t('footer.features')}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                  {t('footer.pricing')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-emerald-400 transition-colors">
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/privacy" className="hover:text-emerald-400 transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-emerald-400 transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};
