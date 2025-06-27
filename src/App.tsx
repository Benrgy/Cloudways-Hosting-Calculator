
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { initializeAnalytics } from "@/utils/analytics";
import { logger } from "@/utils/logger";
import { performanceMonitor } from "@/utils/performance";
import Index from "@/pages/Index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        logger.warn(`Query failed, attempt ${failureCount + 1}`, error);
        return failureCount < 2; // Retry up to 2 times
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Updated basename for the new repository name
const basename = import.meta.env.PROD ? "/cloudways-savings-calculator" : "";

logger.info("App initializing", {
  environment: import.meta.env.MODE,
  production: import.meta.env.PROD,
  baseUrl: import.meta.env.BASE_URL,
  basename: basename,
});

// Initialize analytics
if (typeof window !== 'undefined') {
  initializeAnalytics();
  performanceMonitor.markStart('app-initialization');
}

const NotFound = () => {
  logger.warn("404 - Page not found", { url: window.location.href });
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: 'red' }}>404 - Page Not Found</h1>
      <p>Current URL: {window.location.href}</p>
      <p>Expected basename: {basename}</p>
      <a href={basename || "/"} style={{ color: 'blue', textDecoration: 'underline' }}>
        Go Home
      </a>
    </div>
  );
};

const App = () => {
  logger.info("App component rendering");
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      performanceMonitor.markEnd('app-initialization');
    }
  }, []);

  try {
    return (
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter basename={basename}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </LanguageProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    );
  } catch (error) {
    logger.error("Critical error in App component", error);
    return (
      <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
        <h1>App Component Error</h1>
        <p>Error: {error?.message || 'Unknown error'}</p>
        <p>Check console for more details</p>
      </div>
    );
  }
};

export default App;
