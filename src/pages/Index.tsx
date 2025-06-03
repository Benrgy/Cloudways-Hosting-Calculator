
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Calculator } from "@/components/Calculator";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [showCalculator, setShowCalculator] = useState(false);

  const scrollToCalculator = () => {
    setShowCalculator(true);
    setTimeout(() => {
      const calculatorElement = document.getElementById('calculator');
      if (calculatorElement) {
        calculatorElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero onCalculateClick={scrollToCalculator} />
      <Features />
      {showCalculator && (
        <section id="calculator" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Calculate Your Savings
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Enter your current shared hosting details and see how much you could save with Cloudways
              </p>
            </div>
            <Calculator />
          </div>
        </section>
      )}
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
