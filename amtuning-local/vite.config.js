import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Local development - change to '/VS-SPEED-WEBSITE/' for GitHub Pages
  server: {
    host: '0.0.0.0', // Accept connections from any network interface
    port: 5173,
    strictPort: false,
    open: false, // Don't auto-open, we'll handle this in launch script
    allowedHosts: [
      'www.vsspeed.io',
      'vsspeed.io',
      'localhost',
      '.vsspeed.io' // Allow all subdomains
    ]
  }
})
