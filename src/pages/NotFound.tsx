
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Calculator, RefreshCw } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
      "Full URL:", window.location.href
    );
  }, [location.pathname]);

  const handleReturnHome = () => {
    // Determine the correct home URL based on environment
    if (import.meta.env.DEV) {
      window.location.href = '/';
    } else {
      // For GitHub Pages production
      const hostname = window.location.hostname;
      if (hostname.includes('github.io')) {
        window.location.href = '/cloudways-savings-calculator/';
      } else {
        window.location.href = '/';
      }
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Oops! Page not found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={handleReturnHome}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 w-full"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Home
          </Button>
          
          <Button 
            onClick={handleRefresh}
            variant="outline" 
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-6 py-3 w-full"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Refresh Page
          </Button>
          
          <Link to="/" className="block">
            <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-3 w-full">
              <Calculator className="w-5 h-5 mr-2" />
              Go to Calculator
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
          <p><strong>Debug Info:</strong></p>
          <p>Path: {location.pathname}</p>
          <p>Environment: {import.meta.env.MODE}</p>
          <p>Base URL: {import.meta.env.BASE_URL}</p>
          <p>Hostname: {window.location.hostname}</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
