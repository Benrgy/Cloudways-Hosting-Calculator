
// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
    dataLayer?: any[];
  }
}

// Configuration for Google Analytics
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return;
  
  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(...args: any[]) {
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date().toISOString());
  window.gtag('config', GA_MEASUREMENT_ID, {
    // Enhanced measurement
    enhanced_measurements: true,
    // Custom parameters
    custom_map: {
      'custom_parameter': 'dimension1',
    },
  });

  console.log('Google Analytics initialized with ID:', GA_MEASUREMENT_ID);
};

// Enhanced event tracking with better categorization
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Add common parameters
    const enhancedParams = {
      ...parameters,
      page_title: document.title,
      page_location: window.location.href,
      timestamp: new Date().toISOString(),
    };

    window.gtag('event', eventName, enhancedParams);
  }
  
  // Enhanced console logging for development
  console.log('📊 Analytics Event:', eventName, parameters);
};

export const trackCalculation = (inputs: any, results: any) => {
  trackEvent('calculator_used', {
    monthly_cost: inputs.monthlyHostingCost,
    storage_gb: inputs.storageGB,
    bandwidth_gb: inputs.bandwidthGB,
    websites: inputs.numberOfWebsites,
    monthly_savings: results.monthlySavings,
    annual_savings: results.annualSavings,
    recommended_plan: results.recommendedPlan
  });
};

export const trackResultShare = (method: string) => {
  trackEvent('result_shared', {
    share_method: method
  });
};

export const trackPDFDownload = () => {
  trackEvent('pdf_download_attempted');
};

// New tracking functions for production readiness
export const trackError = (error: string, details?: any) => {
  trackEvent('app_error', {
    event_category: 'Error',
    event_label: error,
    error_details: details ? JSON.stringify(details) : undefined,
  });
};

export const trackPerformance = (metric: string, value: number) => {
  trackEvent('performance_metric', {
    event_category: 'Performance',
    event_label: metric,
    value: Math.round(value),
  });
};

export const trackUserEngagement = (action: string, details?: any) => {
  trackEvent('user_engagement', {
    event_category: 'Engagement',
    event_label: action,
    engagement_details: details ? JSON.stringify(details) : undefined,
  });
};
