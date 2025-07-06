
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  
  // Determine base path based on environment
  const getBasePath = () => {
    if (isDev) {
      return '/';
    }
    
    // Check if we're building for GitHub Pages specifically
    const isGitHubPages = process.env.GITHUB_PAGES === 'true' || 
                         process.env.CI_PLATFORM === 'github' ||
                         process.env.GITHUB_ACTIONS === 'true';
    
    return isGitHubPages ? '/Cloudways-Hosting-Calculator/' : '/';
  };
  
  const basePath = getBasePath();
  
  if (isDev) {
    console.log('=== VITE CONFIG ===');
    console.log('Mode:', mode);
    console.log('Base path:', basePath);
    console.log('isDev:', isDev);
    console.log('GitHub Pages:', process.env.GITHUB_PAGES || 'false');
    console.log('CI Platform:', process.env.CI_PLATFORM || 'none');
  }
  
  return {
    base: basePath,
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      assetsDir: 'assets',
      outDir: 'dist',
      sourcemap: false,
      minify: 'esbuild', // Use esbuild (default and faster)
      cssMinify: true,
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
