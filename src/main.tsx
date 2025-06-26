
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("=== MAIN.TSX STARTING ===");
console.log("Environment:", import.meta.env.MODE);
console.log("Base URL:", import.meta.env.BASE_URL);
console.log("Production:", import.meta.env.PROD);

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("❌ Root element not found!");
    document.body.innerHTML = '<div style="padding: 20px; color: red; text-align: center;"><h1>Error: Root element not found</h1><p>The application cannot start because the root element is missing.</p></div>';
  } else {
    console.log("✅ Root element found, creating React app");
    const root = createRoot(rootElement);
    console.log("✅ Root created, rendering App component");
    root.render(<App />);
    console.log("✅ App component rendered successfully");
  }
} catch (error) {
  console.error("❌ Error in main.tsx:", error);
  document.body.innerHTML = `
    <div style="padding: 20px; color: red; text-align: center;">
      <h1>Application Error</h1>
      <p>Error loading app: ${error?.message || 'Unknown error'}</p>
      <p>Please check the console for more details.</p>
      <button onclick="window.location.reload()" style="padding: 10px 20px; background-color: #059669; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;">
        Reload Page
      </button>
    </div>
  `;
}
