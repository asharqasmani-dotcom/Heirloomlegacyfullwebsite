/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        home: 'index.html',
        about: 'about-us/index.html',
        services: 'our-services/index.html',
        process: 'our-process/index.html',
        partnerships: 'partnerships-support/index.html',
        contact: 'contact-us/index.html',
      },
    },
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
  },
});
