
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { logger } from './utils/logger'
import { performanceMonitor } from './utils/performance'

logger.info("Application starting", {
  environment: import.meta.env.MODE,
  baseUrl: import.meta.env.BASE_URL,
  production: import.meta.env.PROD,
  location: window.location.href,
});

performanceMonitor.markStart('app-mount');

// Add global error handler for unhandled errors
window.addEventListener('error', (event) => {
  logger.error("Global error handler:", event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  logger.error("Unhandled promise rejection:", event.reason);
});

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    logger.error("Root element not found - cannot start application");
    document.body.innerHTML = `
      <div style="padding: 20px; color: red; text-align: center;">
        <h1>Error: Root element not found</h1>
        <p>The application cannot start because the root element is missing.</p>
        <p>Environment: ${import.meta.env.MODE}</p>
        <p>Base URL: ${import.meta.env.BASE_URL}</p>
      </div>
    `;
  } else {
    logger.info("Root element found, creating React app");
    const root = createRoot(rootElement);
    logger.info("Root created, rendering App component");
    root.render(<App />);
    logger.info("App component rendered successfully");
    performanceMonitor.markEnd('app-mount');
  }
} catch (error) {
  logger.error("Critical error in main.tsx", error);
  document.body.innerHTML = `
    <div style="padding: 20px; color: red; text-align: center;">
      <h1>Application Error</h1>
      <p>Error loading app: ${error?.message || 'Unknown error'}</p>
      <p>Environment: ${import.meta.env.MODE}</p>
      <p>Please check the console for more details.</p>
      <button onclick="window.location.reload()" style="padding: 10px 20px; background-color: #059669; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;">
        Reload Page
      </button>
    </div>
  `;
}
