
import React from 'react';
import { Hero } from '@/components/Hero';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { MainSections } from '@/components/MainSections';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';

const Index = () => {
  const { handleCalculateClick } = usePerformanceMonitoring();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
        <Header />
        
        {/* Hero Section with proper h1 */}
        <Hero onCalculateClick={handleCalculateClick} />
        
        {/* Main content sections */}
        <MainSections onCalculateClick={handleCalculateClick} />
        
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Index;
