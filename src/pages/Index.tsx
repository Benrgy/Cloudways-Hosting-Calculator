
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
    <div className="min-h-screen" id="main-content">
      <Header />
      <Hero onCalculateClick={handleCalculateClick} />
      <nav aria-label="Page section links" className="sr-only">
        {/* Hidden navigation for accessibility - provides internal links */}
        <a href="#features">Skip to Features</a>
        <a href="#how-it-works">Skip to How it Works</a>
        <a href="#calculator">Skip to Calculator</a>
        <a href="#faq">Skip to FAQ</a>
      </nav>
      <div id="features" aria-label="Feature section">
        <Features />
      </div>
      <div id="how-it-works" aria-label="How It Works section">
        <HowItWorks />
      </div>
      <div id="calculator" aria-label="Calculator section">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Calculate Your Hosting Savings & Performance Improvements
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get personalized recommendations and see exactly how much you can save by migrating to Cloudways
              </p>
              {/* Internal anchor to FAQ and articles */}
              <p className="text-md text-emerald-700 mt-4">
                <a href="#faq" className="underline text-emerald-700 hover:text-emerald-900" aria-label="Go to FAQ">See answers to common Cloudways migration questions</a>
                {" | "}
                <a href="#embedded-articles" className="underline text-emerald-700 hover:text-emerald-900" aria-label="Go to Cloudways migration tips">Migration & savings tips</a>
              </p>
            </div>
            <AdvancedCalculator />
          </div>
        </section>
      </div>
      <div id="embedded-articles" aria-label="SEO Content & Articles">
        <EmbeddedArticles />
      </div>
      <SEOContent />
      <Testimonials />
      <OptimizationGuides />
      <FeatureComparison />
      <div id="faq" aria-label="FAQ section">
        <FAQ />
      </div>
      <Footer />
      <ConversionBoosters calculatorResult={calculatorResult} />
    </div>
  );
};
export default Index;
