
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const basePath = isDev ? '/' : '/cloudways-savings-calculator/';
  
  console.log('=== VITE CONFIG ===');
  console.log('Mode:', mode);
  console.log('Base path:', basePath);
  console.log('isDev:', isDev);
  
  return {
    base: basePath,
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      assetsDir: 'assets',
      outDir: 'dist',
      sourcemap: false, // Disable sourcemaps for production
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-toast'],
            query: ['@tanstack/react-query'],
            supabase: ['@supabase/supabase-js']
          },
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
    },
    plugins: [
      react(),
      isDev && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
