import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

// Consistent basename handling
const basename = import.meta.env.PROD ? "/cloudways-savings-calculator" : "";

console.log("=== APP.TSX INITIALIZING ===");
console.log("Environment:", import.meta.env.MODE);
console.log("Production:", import.meta.env.PROD);
console.log("Base URL:", import.meta.env.BASE_URL);
console.log("Basename:", basename);

// Enhanced Test Component with more debugging
const TestIndex = () => {
  console.log("✅ TestIndex component rendering successfully");
  
  React.useEffect(() => {
    console.log("✅ TestIndex mounted");
    return () => console.log("TestIndex unmounting");
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'green', marginBottom: '20px' }}>✅ Cloudways Calculator is Working!</h1>
      <div style={{ backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h2 style={{ color: '#0369a1' }}>Environment Information</h2>
        <p><strong>Mode:</strong> {import.meta.env.MODE}</p>
        <p><strong>Production:</strong> {import.meta.env.PROD ? 'Yes' : 'No'}</p>
        <p><strong>Base URL:</strong> {import.meta.env.BASE_URL}</p>
        <p><strong>Basename:</strong> {basename || 'None'}</p>
        <p><strong>Current URL:</strong> {window.location.href}</p>
        <p><strong>Timestamp:</strong> {new Date().toLocaleString()}</p>
      </div>
      <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ color: '#15803d' }}>Success! The app is loading correctly.</h3>
        <p>All React components, routing, and contexts are working properly.</p>
      </div>
    </div>
  );
};

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
              <Route path="/" element={<TestIndex />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
