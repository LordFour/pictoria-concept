import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// GitHub Pages serves the demo under /pictoria-concept/; local dev stays at /
export default defineConfig({
  base: process.env.PAGES_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  server: { host: '127.0.0.1', port: 5173 },
  preview: { host: '127.0.0.1', port: 4173 },
})
