export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  structuredData?: any;
}

export const seoConfigs: Record<string, SEOConfig> = {
  '/': {
    title: 'Cloudways Hosting Calculator - Compare Plans & Save Money | 2024',
    description: 'Free Cloudways hosting calculator to compare plans, estimate costs, and find the perfect cloud hosting solution. Save money with our detailed pricing analysis and recommendations.',
    keywords: 'cloudways calculator, hosting calculator, cloud hosting, web hosting pricing, cloudways plans, hosting comparison, managed hosting',
    ogTitle: 'Cloudways Hosting Calculator - Find Your Perfect Plan',
    ogDescription: 'Calculate your Cloudways hosting costs instantly. Compare plans, analyze performance, and discover the best cloud hosting solution for your needs.',
    twitterTitle: 'Cloudways Hosting Calculator - Compare & Save',
    twitterDescription: 'Free tool to calculate Cloudways hosting costs, compare plans, and find the perfect solution for your website.',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Cloudways Hosting Calculator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "featureList": [
        "Hosting Cost Calculator",
        "Performance Analysis", 
        "Multi-language Support",
        "Real-time Pricing",
        "Savings Calculator",
        "Plan Comparison Tool"
      ]
    }
  },
  '/auth': {
    title: 'Sign In - Cloudways Hosting Calculator',
    description: 'Sign in to your Cloudways Calculator account to save calculations, access advanced features, and get personalized hosting recommendations.',
    keywords: 'login, signin, cloudways calculator account, saved calculations, hosting dashboard',
    ogTitle: 'Sign In to Cloudways Calculator',
    ogDescription: 'Access your saved calculations and personalized hosting recommendations.',
    twitterTitle: 'Sign In - Cloudways Calculator',
    twitterDescription: 'Access your account to save calculations and get personalized recommendations.',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Sign In - Cloudways Calculator",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Cloudways Hosting Calculator"
      }
    }
  },
  '/dashboard': {
    title: 'Dashboard - Cloudways Hosting Calculator',
    description: 'Access your personalized hosting dashboard with saved calculations, cost analysis, and hosting recommendations tailored to your needs.',
    keywords: 'hosting dashboard, saved calculations, cost analysis, hosting recommendations, cloudways account',
    ogTitle: 'Your Hosting Dashboard - Cloudways Calculator',
    ogDescription: 'Manage your saved calculations and get personalized hosting insights.',
    twitterTitle: 'Hosting Dashboard - Cloudways Calculator',
    twitterDescription: 'Your personal dashboard for hosting calculations and recommendations.',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Dashboard - Cloudways Calculator",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Cloudways Hosting Calculator"
      }
    }
  }
};

export const getDefaultSEO = (): SEOConfig => seoConfigs['/'];

export const getSEOConfig = (pathname: string): SEOConfig => {
  return seoConfigs[pathname] || getDefaultSEO();
};