
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { ConversionBoosters } from "@/components/ConversionBoosters";
import { AdvancedCalculator } from "@/components/AdvancedCalculator";
import { EmbeddedArticles } from "@/components/EmbeddedArticles";
import { SEOContent } from "@/components/SEOContent";
import { Testimonials } from "@/components/Testimonials";
import { OptimizationGuides } from "@/components/OptimizationGuides";
import { FeatureComparison } from "@/components/FeatureComparison";
import { FAQ } from "@/components/FAQ";

const Index = () => {
  console.log("=== INDEX COMPONENT STARTING TO RENDER ===");
  
  try {
    const [calculatorResult, setCalculatorResult] = useState(null);

    const handleCalculateClick = () => {
      console.log("Calculate button clicked");
      const calculatorElement = document.getElementById('calculator-section');
      if (calculatorElement) {
        window.requestAnimationFrame(() => {
          calculatorElement.scrollIntoView({ behavior: 'smooth' });
        });
      }
    };

    console.log("✅ Index component rendering successfully");

    return (
      <div className="min-h-screen" id="main-content">
        <Header />
        <Hero onCalculateClick={handleCalculateClick} />
        <nav aria-label="Page section links" className="sr-only">
          <a href="#features-section">Skip to Features</a>
          <a href="#how-it-works-section">Skip to How it Works</a>
          <a href="#calculator-section">Skip to Calculator</a>
          <a href="#faq-section">Skip to FAQ</a>
        </nav>
        <div id="features-section" aria-label="Feature section">
          <h2 className="sr-only">Features</h2>
          <Features />
        </div>
        <div id="how-it-works-section" aria-label="How It Works section">
          <h2 className="sr-only">How It Works</h2>
          <HowItWorks />
        </div>
        <div id="calculator-section" aria-label="Calculator section">
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Calculate Your Hosting Savings & Performance Improvements
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Get personalized recommendations and see exactly how much you can save by migrating to Cloudways.
                </p>
                <p className="text-md text-emerald-700 mt-4">
                  <a href="#faq-section" className="underline text-emerald-700 hover:text-emerald-900" aria-label="View FAQ about Cloudways Migration">See answers to common Cloudways migration questions</a>
                  {" | "}
                  <a href="#embedded-articles-section" className="underline text-emerald-700 hover:text-emerald-900" aria-label="Read Cloudways migration articles">Read migration & savings tips</a>
                </p>
              </div>
              <AdvancedCalculator />
            </div>
          </section>
        </div>
        <div id="embedded-articles-section" aria-label="SEO Content & Articles">
          <h2 className="sr-only">Cloudways Articles and SEO Content</h2>
          <EmbeddedArticles />
        </div>
        <div>
          <h2 className="sr-only">In-depth SEO Content</h2>
          <SEOContent />
        </div>
        <div>
          <h2 className="sr-only">Customer Testimonials</h2>
          <Testimonials />
        </div>
        <div>
          <h2 className="sr-only">Optimization Guides</h2>
          <OptimizationGuides />
        </div>
        <div>
          <h2 className="sr-only">Feature Comparison</h2>
          <FeatureComparison />
        </div>
        <div id="faq-section" aria-label="FAQ section">
          <h2 className="sr-only">Frequently Asked Questions</h2>
          <FAQ />
        </div>
        <Footer />
        <ConversionBoosters calculatorResult={calculatorResult} />
      </div>
    );
  } catch (error) {
    console.error("❌ ERROR IN INDEX COMPONENT:", error);
    return (
      <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
        <h1>Error Loading Page</h1>
        <p>Error: {error.message}</p>
        <p>Check console for more details</p>
      </div>
    );
  }
};

export default Index;
