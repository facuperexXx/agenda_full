import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // Necesario para Docker
    port: 5173,
    proxy: {
      // Redirige /api al backend Flask para evitar problemas de CORS en dev local
      '/api': { target: 'http://localhost:5000', changeOrigin: true, rewrite: (path) => path.replace(/^\/api/, '') }
    }
  }
})
