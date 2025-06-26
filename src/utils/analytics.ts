
// Google Analytics utility for tracking user interactions
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
  
  // Fallback console logging for development
  console.log('Analytics Event:', eventName, parameters);
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
