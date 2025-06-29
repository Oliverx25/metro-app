import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This helps with Leaflet marker icons
      'leaflet/dist/images/marker-icon-2x.png': resolve(__dirname, 'node_modules/leaflet/dist/images/marker-icon-2x.png'),
      'leaflet/dist/images/marker-icon.png': resolve(__dirname, 'node_modules/leaflet/dist/images/marker-icon.png'),
      'leaflet/dist/images/marker-shadow.png': resolve(__dirname, 'node_modules/leaflet/dist/images/marker-shadow.png'),
    },
  },
  // Copy static files
  build: {
    assetsInlineLimit: 0, // Ensure all assets are copied
  },
});
