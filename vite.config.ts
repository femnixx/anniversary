import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/anniversary/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion', 'gsap'],
          mui: ['@mui/material', '@mui/lab', '@emotion/react', '@emotion/styled'],
          aws: ['@aws-sdk/client-s3', '@aws-sdk/s3-request-presigner'],
        }
      }
    },
    chunkSizeWarningLimit: 700
  }
})