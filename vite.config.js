import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // base: '/projects/movie-app/',
  plugins: [
    react(),
    tailwindcss()
  ],
})
