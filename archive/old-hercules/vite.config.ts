import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

/**
 * HERCULES front-end build configuration.
 *
 * The app never talks to a third-party AI provider directly. All backend
 * traffic is funnelled through src/services (contract layer) which reads
 * VITE_HERCULES_API_BASE / VITE_HERCULES_TRANSPORT at runtime.
 * See docs/BACKEND_INTEGRATION.md.
 */
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    open: false,
    // Allow the sandbox/preview proxy hosts plus local development.
    allowedHosts: ['.e2b.app', 'localhost', '127.0.0.1'],
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: ['.e2b.app', 'localhost', '127.0.0.1'],
  },
  build: {
    target: 'es2022',
    sourcemap: true,
    chunkSizeWarningLimit: 900,
  },
});
