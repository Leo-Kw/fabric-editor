import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      '/output/': {
        target: 'https://test.vivue.io',
        changeOrigin: true,
      },
    },
  },
})
