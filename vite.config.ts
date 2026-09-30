import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({ base: process.env.BASE_PATH ?? '/', plugins: [react(), tailwindcss()],
  // Inline empty PostCSS config so a parent folder's postcss.config.js is never picked up
  css: { postcss: { plugins: [] } } })
