
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { logger } from './utils/logger'
import { performanceMonitor } from './utils/performance'

console.log("=== MAIN.TSX STARTING ===");

logger.info("Application starting", {
  environment: import.meta.env.MODE,
  baseUrl: import.meta.env.BASE_URL,
  production: import.meta.env.PROD,
  location: window.location.href,
  userAgent: navigator.userAgent,
});

performanceMonitor.markStart('app-mount');

// Add global error handler for unhandled errors
window.addEventListener('error', (event) => {
  logger.error("Global error handler:", {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
});

window.addEventListener('unhandledrejection', (event) => {
  logger.error("Unhandled promise rejection:", {
    reason: event.reason,
    type: event.type
  });
});

// Enhanced DOM ready check
const initializeApp = () => {
  try {
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      logger.error("Root element not found - cannot start application");
      document.body.innerHTML = `
        <div style="padding: 20px; color: red; text-align: center; font-family: Arial, sans-serif;">
          <h1>Error: Root element not found</h1>
          <p>The application cannot start because the root element is missing.</p>
          <p>Environment: ${import.meta.env.MODE}</p>
          <p>Base URL: ${import.meta.env.BASE_URL}</p>
          <button onclick="window.location.reload()" style="padding: 10px 20px; background-color: #059669; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;">
            Reload Page
          </button>
        </div>
      `;
      return;
    }

    logger.info("Root element found, creating React app");
    const root = createRoot(rootElement);
    
    logger.info("Root created, rendering App component");
    root.render(<App />);
    
    logger.info("App component rendered successfully");
    performanceMonitor.markEnd('app-mount');
    
    // Additional initialization checks
    setTimeout(() => {
      const appElements = document.querySelectorAll('[data-testid], .min-h-screen');
      logger.info(`App initialization check: Found ${appElements.length} app elements`);
    }, 1000);
    
  } catch (error) {
    logger.error("Critical error in main.tsx initialization", error);
    document.body.innerHTML = `
      <div style="padding: 20px; color: red; text-align: center; font-family: Arial, sans-serif; background: #fee; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div>
          <h1>Application Error</h1>
          <p>Error loading app: ${error?.message || 'Unknown error'}</p>
          <p>Environment: ${import.meta.env.MODE}</p>
          <p>Please check the console for more details.</p>
          <button onclick="window.location.reload()" style="padding: 10px 20px; background-color: #059669; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;">
            Reload Page
          </button>
          <details style="margin-top: 20px; text-align: left;">
            <summary style="cursor: pointer;">Technical Details</summary>
            <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; max-width: 100%; font-size: 12px;">
${error?.stack || 'No stack trace available'}
            </pre>
          </details>
        </div>
      </div>
    `;
  }
};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
