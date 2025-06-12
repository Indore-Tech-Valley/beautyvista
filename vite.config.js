import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // bind to all network interfaces
    port: 3000, // or any port you want
  },
  
    build: {
    outDir: 'build'  // This changes output folder from dist to build
  },
  base:'/beautyvista/',
})
