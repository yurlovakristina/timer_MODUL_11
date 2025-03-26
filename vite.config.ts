import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vuePlugin(),
    VitePWA({
      devOptions: {
        enabled: true
      },
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/apple-touch-icon-180x180.png', 'icons/maskable-icon-512x512.png'],
      manifest: {
        name: 'Vue Timer App',
        short_name: 'Timer App',
        description: 'A customizable timer for Tabata and EMOM workouts',
        theme_color: '#f0f0f0',
        icons: [
          {
            src: 'assets/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'assets/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'assets/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
              },
            },
          },
        ],
      },
    }),
  ],
})