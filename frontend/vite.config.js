import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On NE met PAS tailwindcss ici pour la version v3 standard
export default defineConfig({
  plugins: [react()],
})