import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'
import compression from 'vite-plugin-compression'

export default defineConfig({
  base: '/', // ✅ FIXES /dist asset issue

  plugins: [
    tailwindcss(),
    react(),

    sitemap({
      hostname: 'https://99mobiletech.com',
      exclude: ['/admin', '/login'],
      routes: [
        '/products',
        '/products/mobile',
        '/products/laptops'
      ]
    }),

    compression({
      algorithm: 'brotliCompress'
    })
  ],

  server: {
    port: 3000,
    proxy: {
      '/v1/api': {
        target: 'https://api.99mobiletech.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
