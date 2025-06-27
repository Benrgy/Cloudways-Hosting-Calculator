
import { Calculator } from "@/components/Calculator";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ConversionBoosters } from "@/components/ConversionBoosters";
import { OptimizationGuides } from "@/components/OptimizationGuides";
import { SEOContent } from "@/components/SEOContent";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { EnhancedCalculator } from "@/components/EnhancedCalculator";
import { useAuth } from "@/contexts/AuthContext";
import { useABTest } from "@/components/ABTestProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();
  const { getVariant, trackConversion } = useABTest();
  
  // A/B test for calculator version
  const calculatorVariant = getVariant('calculator_version');
  
  const handleCalculatorInteraction = () => {
    trackConversion('calculator_version', 'calculator_used');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Enhanced Hero with Auth CTA */}
      <div className="relative">
        <Hero />
        
        {/* Enhanced CTA Section */}
        <div className="absolute top-4 right-4 z-10">
          {user ? (
            <Link to="/dashboard">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg">
                <User className="w-4 h-4 mr-2" />
                Dashboard
                <Badge variant="secondary" className="ml-2 bg-white text-emerald-700">
                  Pro
                </Badge>
              </Button>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link to="/auth">
                <Button variant="outline" className="bg-white/90 backdrop-blur-sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg">
                  <Zap className="w-4 h-4 mr-2" />
                  Get Started Free
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Calculator Section with A/B Test */}
      <section id="calculator" className="py-20 bg-gray-50" onClick={handleCalculatorInteraction}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {calculatorVariant === 'B' ? 'Advanced Hosting Calculator' : 'Calculate Your Savings'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {calculatorVariant === 'B' 
                ? 'Professional hosting analysis with compliance, security, and performance optimization'
                : 'See how much you could save by switching to optimized cloud hosting'
              }
            </p>
          </div>
          
          {calculatorVariant === 'B' ? <EnhancedCalculator /> : <Calculator />}
        </div>
      </section>

      <Features />
      <HowItWorks />
      
      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Stay Ahead of Hosting Trends
              </h2>
              <p className="text-gray-600">
                Join thousands of professionals who get our weekly insights on hosting optimization, 
                cost reduction strategies, and industry trends.
              </p>
            </div>
            <NewsletterSignup />
          </div>
        </div>
      </section>

      <ConversionBoosters />
      <OptimizationGuides />
      <Testimonials />
      <FAQ />
      <SEOContent />
      <Footer />
    </div>
  );
};

export default Index;
