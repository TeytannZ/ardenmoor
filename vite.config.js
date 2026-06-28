import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/ardenmoor/',
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg:  { quality: 85 },
      jpeg: { quality: 85 },
      png:  { quality: 85 },
      webp: { quality: 85 },
      logStats: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      // Service worker is injected into index.html automatically
      injectRegister: 'auto',
      workbox: {
        // Precache the app shell (JS bundles, CSS, HTML, fonts)
        globPatterns: ['**/*.{js,css,html,woff,woff2}'],
        // Allow large audio/image files to be cached (default is 2MB — way too low)
        maximumFileSizeToCacheInBytes: 25 * 1024 * 1024,
        runtimeCaching: [
          {
            // Images — cache on first access, serve from cache after
            urlPattern: /\/assets\/images\/.+\.(?:png|jpg|jpeg|webp|svg)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ardenmoor-images',
              expiration: {
                maxEntries: 600,
                maxAgeSeconds: 60 * 60 * 24 * 60, // 60 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Audio — cache on first play, serve from cache after
            // rangeRequests: true is required for <audio> seek support
            urlPattern: /\/assets\/audio\/.+\.(?:mp3|ogg|wav)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ardenmoor-audio',
              expiration: {
                maxEntries: 400,
                maxAgeSeconds: 60 * 60 * 24 * 60,
              },
              cacheableResponse: { statuses: [0, 200] },
              rangeRequests: true,
            },
          },
        ],
      },
      manifest: {
        name: 'Ardenmoor',
        short_name: 'Ardenmoor',
        description: 'A narrative learning experience set in the world of the Archive.',
        theme_color: '#06050d',
        background_color: '#06050d',
        display: 'standalone',
        start_url: '/ardenmoor/',
        scope:     '/ardenmoor/',
        icons: [],
      },
      // Keep disabled in dev — service workers add confusing caching during development
      devOptions: { enabled: false },
    }),
  ],
})
