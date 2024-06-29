import path from 'path'
import svgLoader from 'vite-svg-loader'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [vue(), svgLoader(),
    VitePWA({
      cachingStrategy: 'NetworkOnly',
      manifest: {
      name: 'CLHS Gohan',
      short_name: 'CLHS Gohan',
      description: '非官方壢中熱食部點餐系統',
      theme_color: '#BFE2FF',
      background_color: '#0A131A',
      display: 'standalone',
      icons: [
        {
          src: '/pwalogos/maskable_icon_x128.png',
          sizes: '128x128',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/pwalogos/maskable_icon_x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/pwalogos/maskable_icon_x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
