
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ABTest {
  testId: string;
  variant: 'A' | 'B';
  name: string;
}

interface ABTestContextType {
  tests: Record<string, ABTest>;
  getVariant: (testId: string) => 'A' | 'B';
  trackConversion: (testId: string, conversionType: string) => void;
}

const ABTestContext = createContext<ABTestContextType | undefined>(undefined);

export const useABTest = () => {
  const context = useContext(ABTestContext);
  if (!context) {
    throw new Error('useABTest must be used within ABTestProvider');
  }
  return context;
};

export const ABTestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tests, setTests] = useState<Record<string, ABTest>>({});

  // Define active tests
  const activeTests = [
    { testId: 'calculator_cta', name: 'Calculator CTA Button', variants: ['A', 'B'] },
    { testId: 'pricing_display', name: 'Pricing Display Format', variants: ['A', 'B'] },
    { testId: 'onboarding_flow', name: 'User Onboarding', variants: ['A', 'B'] }
  ];

  useEffect(() => {
    // Initialize test variants for the user
    const userTests: Record<string, ABTest> = {};
    
    activeTests.forEach(test => {
      const storageKey = `ab_test_${test.testId}`;
      let variant = localStorage.getItem(storageKey) as 'A' | 'B';
      
      if (!variant) {
        // Assign random variant
        variant = Math.random() > 0.5 ? 'B' : 'A';
        localStorage.setItem(storageKey, variant);
      }
      
      userTests[test.testId] = {
        testId: test.testId,
        variant,
        name: test.name
      };
    });
    
    setTests(userTests);
  }, [user]);

  const getVariant = (testId: string): 'A' | 'B' => {
    return tests[testId]?.variant || 'A';
  };

  const trackConversion = (testId: string, conversionType: string) => {
    const test = tests[testId];
    if (!test) return;

    // Track conversion event
    console.log(`AB Test Conversion: ${testId} - Variant ${test.variant} - ${conversionType}`);
    
    // In a real implementation, you would send this to your analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_conversion', {
        test_id: testId,
        variant: test.variant,
        conversion_type: conversionType,
        user_id: user?.id || 'anonymous'
      });
    }
  };

  return (
    <ABTestContext.Provider value={{ tests, getVariant, trackConversion }}>
      {children}
    </ABTestContext.Provider>
  );
};
