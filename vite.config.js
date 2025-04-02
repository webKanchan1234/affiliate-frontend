import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import ssr from 'vite-plugin-ssr/plugin'
import sitemap from 'vite-plugin-sitemap';
import compression from 'vite-plugin-compression';
import springBoot from '@wim.deblauwe/vite-plugin-spring-boot';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    springBoot(),
    sitemap({
      hostname: 'https://yourdomain.com',
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
    port: 3000, // Change the port here
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})