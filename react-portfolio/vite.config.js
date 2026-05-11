import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'lakshya192.png', 'lakshya512.png'],
      manifest: {
        name: "Lakshya's Portfolio",
        short_name: 'Lakshya',
        description: 'Portfolio of Lakshya Agarwal, Full Stack Web Developer',
        theme_color: '#081b29',
        background_color: '#081b29',
        display: 'standalone',
        icons: [
          {
            src: 'lakshya192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'lakshya512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
})
