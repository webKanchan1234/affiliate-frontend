/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import history from 'connect-history-api-fallback';
import ssr from 'vite-plugin-ssr/plugin';

export default defineConfig({
  plugins: [react(),ssr()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    }
  },
  server: {
    fs: {
      allow: ['.']
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          helmet: ['react-helmet-async'],
        },
      },
    },
  },
})