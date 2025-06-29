
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

const queryClient = new QueryClient();

function App() {
  return (
    <SupabaseErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider>
            <HelmetProvider>
              <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
                <Toaster />
                <BrowserRouter>
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
