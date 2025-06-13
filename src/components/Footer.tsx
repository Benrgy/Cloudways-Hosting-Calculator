
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const handleCloudwaysClick = () => {
    window.open('https://www.cloudways.com/en/?id=1384181&utm_source=calculator&utm_medium=footer&utm_campaign=savings_calculator', '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CW</span>
              </div>
              <span className="ml-2 text-xl font-bold">Cloudways Savings Calculator</span>
            </div>
            <p className="text-gray-400 max-w-md mb-4">
              Compare shared hosting costs with Cloudways managed cloud hosting. 
              Make informed decisions with accurate calculations and personalized recommendations.
            </p>
            <button 
              onClick={handleCloudwaysClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started with Cloudways →
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#features" className="hover:text-emerald-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-emerald-400 transition-colors">
                  Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Cloudways Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={handleCloudwaysClick}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Cloudways Hosting
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.open('https://www.cloudways.com/en/?id=1384181&utm_source=calculator&utm_medium=footer_support&utm_campaign=savings_calculator', '_blank')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  24/7 Expert Support
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.open('https://www.cloudways.com/en/?id=1384181&utm_source=calculator&utm_medium=footer_migration&utm_campaign=savings_calculator', '_blank')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Free Migration Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Cloudways Savings Calculator. All rights reserved.
            </div>
            
            {/* Affiliate Disclosure */}
            <div className="text-gray-400 text-xs text-center md:text-right">
              <p className="mb-2">
                *Disclosure: I earn commissions if you sign up for Cloudways using my links. 
                This helps support the development of this free calculator tool.
              </p>
              <div className="flex items-center justify-center md:justify-end">
                Made with <Heart className="w-4 h-4 mx-1 text-emerald-500" /> for better hosting decisions
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
