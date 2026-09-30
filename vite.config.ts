import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this repo at /website-ru/; dev server stays at /.
export default defineConfig(({ command }) => ({ base: command === 'build' ? '/website-ru/' : '/', plugins: [react(), tailwindcss()],
  // Inline empty PostCSS config so a parent folder's postcss.config.js is never picked up
  css: { postcss: { plugins: [] } } }))
