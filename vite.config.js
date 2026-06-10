import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  base: '/ardenmoor/',   // must match your GitHub repo name exactly
  plugins: [
    react(),
    ViteImageOptimizer({
      // JPG/JPEG — compress, keep as jpg
      jpg: { quality: 85 },
      jpeg: { quality: 85 },
      // PNG — compress, keep as png (for transparent images)
      png: { quality: 85 },
      // WebP — if you manually provide .webp files
      webp: { quality: 85 },
      // Do NOT silently fail — log what was optimized
      logStats: true,
    }),
  ],
})
