import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages publica em https://usuario.github.io/nutrihumor/
  // então o app precisa conhecer esse subcaminho para carregar os
  // arquivos JS/CSS corretamente.
  base: '/nutrihumor/',
  plugins: [react(), tailwindcss()],
})
