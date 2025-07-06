
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import { SupabaseErrorBoundary } from '@/components/SupabaseErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // Handle GitHub Pages SPA routing
  React.useEffect(() => {
    if (import.meta.env.DEV) {
      console.log("=== APP INITIALIZATION ===");
      console.log("Current URL:", window.location.href);
      console.log("Environment:", import.meta.env.MODE);
      console.log("Base URL:", import.meta.env.BASE_URL);
    }
    
    // Check for GitHub Pages redirect parameters
    const search = window.location.search;
    if (search && search.indexOf('?/') !== -1) {
      const pathAndParams = search.slice(2);
      const [path, ...paramParts] = pathAndParams.split('&');
      const params = paramParts.join('&').replace(/~/g, '&');
      const finalPath = path || '/';
      const finalUrl = finalPath + (params ? '?' + params : '');
      
      if (import.meta.env.DEV) {
        console.log('GitHub Pages redirect detected:');
        console.log('- Original search:', search);
        console.log('- Extracted path:', finalPath);
        console.log('- Final URL:', finalUrl);
      }
      
      window.history.replaceState(null, '', finalUrl);
    }

    // Check for stored redirect info
    const redirectInfo = sessionStorage.getItem('github-pages-redirect');
    if (redirectInfo) {
      try {
        const info = JSON.parse(redirectInfo);
        if (import.meta.env.DEV) {
          console.log('Found stored redirect info:', info);
        }
        sessionStorage.removeItem('github-pages-redirect');
      } catch (e) {
        if (import.meta.env.DEV) {
          console.warn('Failed to parse redirect info:', e);
        }
      }
    }
  }, []);

  // Determine basename for router
  const getBasename = () => {
    if (import.meta.env.DEV) {
      return '';
    }
    
    // Check if we're on GitHub Pages specifically
    const hostname = window.location.hostname;
    const isGitHubPages = hostname.includes('github.io');
    
    if (isGitHubPages) {
      return '/Cloudways-Hosting-Calculator';
    }
    
    // For Netlify, Vercel, and other hosting platforms
    return '';
  };

  const basename = getBasename();
  if (import.meta.env.DEV) {
    console.log('Router basename:', basename);
    console.log('Hostname:', window.location.hostname);
  }
  
  return (
    <SupabaseErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider>
            <HelmetProvider>
              <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
                <Toaster />
                <BrowserRouter basename={basename}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </div>
            </HelmetProvider>
          </AuthProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </SupabaseErrorBoundary>
  );
}

export default App;
