import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';


const VITE_API_URI = process.env.VITE_API_URI || 'https://chat-app-3kbk.onrender.com';
console.log('VITE_API_URI:', VITE_API_URI);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URI,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
