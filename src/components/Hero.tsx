
import { Button } from "@/components/ui/button";
import { Calculator, ArrowUp, Shield, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroProps {
  onCalculateClick: () => void;
}

export const Hero = ({ onCalculateClick }: HeroProps) => {
  const { t } = useLanguage();

  const handleCloudwaysClick = () => {
    window.open('https://www.cloudways.com/en/?id=1384181&utm_source=calculator&utm_medium=hero_cta&utm_campaign=savings_calculator', '_blank');
  };

  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Cloudways Savings Calculator
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-800 mb-8">
            Instantly Compare Shared Hosting vs. Cloud Hosting Costs
          </h2>
          <p className="text-xl text-gray-800 mb-12 max-w-3xl mx-auto">
            See exactly how much you can save by migrating from shared hosting to Cloudways managed cloud hosting. 
            Get personalized recommendations, real performance improvements, and expert migration guidance.
          </p>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                <Calculator className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Instant Calculations</h3>
              <p className="text-sm text-gray-800">Get real-time cost comparisons and savings estimates</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <ArrowUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Performance Boost</h3>
              <p className="text-sm text-gray-800">Up to 250% faster loading speeds guaranteed</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Better Security</h3>
              <p className="text-sm text-gray-800">Enterprise-grade security and automated backups</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <ChevronDown className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Free Migration</h3>
              <p className="text-sm text-gray-800">Expert team handles everything with zero downtime</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              onClick={onCalculateClick}
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-medium"
            >
              Calculate My Savings Now
            </Button>
            <Button 
              onClick={handleCloudwaysClick}
              size="lg" 
              variant="outline"
              className="border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white px-8 py-4 text-lg font-medium"
            >
              Start Free Cloudways Trial
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-900 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Used by 10,000+ website owners</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Average 40% cost savings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
