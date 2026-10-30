import { defineConfig } from 'vite'
import canvasCommons from '@canvas-commons/vite-plugin'

export default defineConfig({
  plugins: [canvasCommons()],
  optimizeDeps: {
    exclude: ['@canvas-commons/editor'],
  },
})
