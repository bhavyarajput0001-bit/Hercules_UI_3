import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  root: '.',
  server: {
    port: 5199,
    fs: {
      // Allow the mockup root AND the shared Hercules src (imported via alias)
      allow: [
        path.resolve(__dirname, '..', 'hercules', 'src'),
        path.resolve(__dirname, '.'),
      ],
    },
  },
  resolve: {
    alias: {
      '@hologram': path.resolve(__dirname, '..', 'hercules', 'src', 'hologram'),
    },
  },
});
