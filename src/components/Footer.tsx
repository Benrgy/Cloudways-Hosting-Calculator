import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const handleCloudwaysClick = () => {
    window.open('https://www.cloudways.com/en/?id=1384181', '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="ml-2 text-xl font-bold">HostingCalc</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Compare shared hosting costs with Cloudways managed cloud hosting. 
              Make informed decisions with accurate calculations and personalized recommendations.
            </p>
            <button 
              onClick={handleCloudwaysClick}
              className="mt-4 text-emerald-400 hover:text-emerald-300 transition-colors underline"
            >
              Get Started with Cloudways
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
                <Link to="/blog" className="hover:text-emerald-400 transition-colors">
                  Blog
                </Link>
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
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={handleCloudwaysClick}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Contact Support Team
                </button>
              </li>
              <li>
                <button 
                  onClick={handleCloudwaysClick}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Cloudways Hosting
                </button>
              </li>
              <li>
                <a href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 HostingCalc. All rights reserved.
            </div>
            
            <div className="flex items-center text-gray-400 text-sm mt-4 md:mt-0">
              Made with <Heart className="w-4 h-4 mx-1 text-emerald-500" /> for better hosting decisions
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
