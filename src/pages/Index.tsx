
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { AdvancedCalculator } from "@/components/AdvancedCalculator";
import { EmbeddedArticles } from "@/components/EmbeddedArticles";
import { SEOContent } from "@/components/SEOContent";
import { Testimonials } from "@/components/Testimonials";
import { OptimizationGuides } from "@/components/OptimizationGuides";
import { FeatureComparison } from "@/components/FeatureComparison";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { ConversionBoosters } from "@/components/ConversionBoosters";
import { useState } from "react";

const Index = () => {
  const [calculatorResult, setCalculatorResult] = useState(null);
  
  const handleCalculateClick = () => {
    // Scroll to calculator section
    const calculatorElement = document.getElementById('calculator');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Hero onCalculateClick={handleCalculateClick} />
      <div id="features">
        <Features />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="calculator">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Calculate Your Hosting Savings & Performance Improvements
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get personalized recommendations and see exactly how much you can save by migrating to Cloudways
              </p>
            </div>
            <AdvancedCalculator />
          </div>
        </section>
      </div>
      <EmbeddedArticles />
      <SEOContent />
      <Testimonials />
      <OptimizationGuides />
      <FeatureComparison />
      <div id="faq">
        <FAQ />
      </div>
      <Footer />
      <ConversionBoosters calculatorResult={calculatorResult} />
    </div>
  );
};

export default Index;
