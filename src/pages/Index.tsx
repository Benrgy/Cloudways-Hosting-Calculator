
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Calculator } from "@/components/Calculator";
import { FeatureComparison } from "@/components/FeatureComparison";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { AdminQuickAccess } from "@/components/AdminQuickAccess";

const Index = () => {
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
      <Features />
      <HowItWorks />
      <div id="calculator">
        <Calculator />
      </div>
      <FeatureComparison />
      <FAQ />
      <Footer />
      <AdminQuickAccess />
    </div>
  );
};

export default Index;
