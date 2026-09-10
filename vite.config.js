import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Build every standalone page so Vercel can serve each navigation link.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        designs: resolve(__dirname, 'designs.html'),
        training: resolve(__dirname, 'training.html'),
        facilities: resolve(__dirname, 'facilities.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
