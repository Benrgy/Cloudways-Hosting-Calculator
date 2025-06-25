
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "@/pages/Index";

const queryClient = new QueryClient();

// Consistent basename handling
const basename = import.meta.env.PROD ? "/cloudways-savings-calculator" : "";

console.log("=== APP.TSX INITIALIZING ===");
console.log("Environment:", import.meta.env.MODE);
console.log("Production:", import.meta.env.PROD);
console.log("Base URL:", import.meta.env.BASE_URL);
console.log("Basename:", basename);

const NotFound = () => {
  console.log("❌ 404 - NotFound component rendering");
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
  console.log("=== APP COMPONENT RENDERING ===");
  
  return (
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
  );
};

export default App;
