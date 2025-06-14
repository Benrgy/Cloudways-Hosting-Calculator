
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { ConversionBoosters } from "@/components/ConversionBoosters";
import { useState, lazy, Suspense } from "react";

// Minimal error boundary for Suspense wrappers
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<Error | null>(null);
  if (error) return <div className="text-red-700 bg-red-100 p-4 text-center">Error loading section: {error.message}</div>;
  return (
    <ErrorBoundaryImpl onError={setError}>
      {children}
    </ErrorBoundaryImpl>
  );
}

// Helper component (catches error with componentDidCatch)
class ErrorBoundaryImpl extends React.Component<{ onError: (err: Error) => void }, { hasError: boolean }> {
  constructor(props: any) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error) { this.props.onError(error); }
  render() { if (this.state.hasError) return null; return this.props.children; }
}

// --- LAZY IMPORTS (all are named exports, validated) ---
const AdvancedCalculator = lazy(() =>
  import("@/components/AdvancedCalculator").then((m) => {
    console.log("AdvancedCalculator loaded");
    return { default: m.AdvancedCalculator };
  })
);
const EmbeddedArticles = lazy(() =>
  import("@/components/EmbeddedArticles").then((m) => {
    console.log("EmbeddedArticles loaded");
    return { default: m.EmbeddedArticles };
  })
);
const SEOContent = lazy(() =>
  import("@/components/SEOContent").then((m) => {
    console.log("SEOContent loaded");
    return { default: m.SEOContent };
  })
);
const Testimonials = lazy(() =>
  import("@/components/Testimonials").then((m) => {
    console.log("Testimonials loaded");
    return { default: m.Testimonials };
  })
);
const OptimizationGuides = lazy(() =>
  import("@/components/OptimizationGuides").then((m) => {
    console.log("OptimizationGuides loaded");
    return { default: m.OptimizationGuides };
  })
);
const FeatureComparison = lazy(() =>
  import("@/components/FeatureComparison").then((m) => {
    console.log("FeatureComparison loaded");
    return { default: m.FeatureComparison };
  })
);
const FAQ = lazy(() =>
  import("@/components/FAQ").then((m) => {
    console.log("FAQ loaded");
    return { default: m.FAQ };
  })
);

const Index = () => {
  const [calculatorResult, setCalculatorResult] = useState(null);

  const handleCalculateClick = () => {
    const calculatorElement = document.getElementById('calculator-section');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen" id="main-content">
      <Header />
      <h1 className="sr-only">
        Cloudways Savings Calculator – Hosting Cost & Performance Tool
      </h1>
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
            <ErrorBoundary>
              <Suspense fallback={<div className="w-full text-center py-16">Loading calculator…</div>}>
                <AdvancedCalculator />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>
      </div>
      <div id="embedded-articles-section" aria-label="SEO Content & Articles">
        <h2 className="sr-only">Cloudways Articles and SEO Content</h2>
        <ErrorBoundary>
          <Suspense fallback={<div className="w-full text-center py-8">Loading articles…</div>}>
            <EmbeddedArticles />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div>
        <h2 className="sr-only">In-depth SEO Content</h2>
        <ErrorBoundary>
          <Suspense fallback={<div className="w-full text-center py-8">Loading SEO content…</div>}>
            <SEOContent />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div>
        <h2 className="sr-only">Customer Testimonials</h2>
        <ErrorBoundary>
          <Suspense fallback={<div className="w-full text-center py-8">Loading testimonials…</div>}>
            <Testimonials />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div>
        <h2 className="sr-only">Optimization Guides</h2>
        <ErrorBoundary>
          <Suspense fallback={<div className="w-full text-center py-8">Loading guides…</div>}>
            <OptimizationGuides />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div>
        <h2 className="sr-only">Feature Comparison</h2>
        <ErrorBoundary>
          <Suspense fallback={<div className="w-full text-center py-8">Loading feature comparison…</div>}>
            <FeatureComparison />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div id="faq-section" aria-label="FAQ section">
        <h2 className="sr-only">Frequently Asked Questions</h2>
        <ErrorBoundary>
          <Suspense fallback={<div className="w-full text-center py-8">Loading FAQ…</div>}>
            <FAQ />
          </Suspense>
        </ErrorBoundary>
      </div>
      <Footer />
      <ConversionBoosters calculatorResult={calculatorResult} />
    </div>
  );
};

export default Index;
