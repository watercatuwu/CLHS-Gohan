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
  plugins: [vue(), svgLoader(), VitePWA({
      manifest: {
      name: 'LunCLHS Next',
      short_name: 'LunCLHS Next',
      description: '壢中午餐點餐系統',
      theme_color: '#1e1e2e',
      display: 'standalone',
      icons: [
        {
          src: '/pwalogos/logo128.png',
          sizes: '128x128',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/pwalogos/logo192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/pwalogos/logo512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/pwalogos/maskable_icon_x128.png',
          sizes: '128x128',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/pwalogos/maskable_icon_x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/pwalogos/maskable_icon_x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
