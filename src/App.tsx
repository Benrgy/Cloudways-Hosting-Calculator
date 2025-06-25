
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

// Only use basename in production for GitHub Pages
const basename = import.meta.env.PROD ? "/cloudways-savings-calculator" : "";

console.log("=== APP.TSX LOADING ===");
console.log("App initializing with basename:", basename);
console.log("Environment:", import.meta.env.MODE);
console.log("Production:", import.meta.env.PROD);

// Simplified Index component for testing
const TestIndex = () => {
  console.log("✅ TestIndex component rendering");
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: 'green' }}>✅ App is Working!</h1>
      <p>Environment: {import.meta.env.MODE}</p>
      <p>Base URL: {import.meta.env.BASE_URL}</p>
      <p>Basename: {basename}</p>
      <p>Current URL: {window.location.href}</p>
    </div>
  );
};

const NotFound = () => {
  console.log("❌ 404 - NotFound component rendering");
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: 'red' }}>404 - Page Not Found</h1>
      <p>Current URL: {window.location.href}</p>
      <a href="/" style={{ color: 'blue' }}>Go Home</a>
    </div>
  );
};

const App = () => {
  console.log("=== APP COMPONENT RENDERING ===");
  
  try {
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
  } catch (error) {
    console.error("❌ Error in App component:", error);
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>App Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }
};

export default App;
