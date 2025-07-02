
import React from 'react';
import { performanceMonitor } from '@/utils/performance';

export const usePerformanceMonitoring = () => {
  React.useEffect(() => {
    performanceMonitor.markStart('page-load');
    
    const handleLoad = () => {
      performanceMonitor.markEnd('page-load');
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const handleCalculateClick = React.useCallback(() => {
    performanceMonitor.markStart('scroll-to-calculator');
    const calculatorElement = document.getElementById('calculator');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' });
      performanceMonitor.markEnd('scroll-to-calculator');
    }
  }, []);

  return { handleCalculateClick };
};
