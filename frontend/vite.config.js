import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      "sztat-147-30-161-227.run.pinggy-free.link"
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/media': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
