import path from 'path'
import svgLoader from 'vite-svg-loader'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import manifest from './vitepwa.config.js'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [vue(), svgLoader(), VitePWA(manifest)],
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
