
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const basePath = isDev ? '/' : '/cloudways-savings-calculator/';
  
  console.log('Vite config - Mode:', mode);
  console.log('Vite config - Base path:', basePath);
  
  return {
    base: basePath,
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      assetsDir: 'assets',
      outDir: 'dist',
      sourcemap: true, // Enable sourcemaps for debugging
      rollupOptions: {
        output: {
          manualChunks: undefined,
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
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
