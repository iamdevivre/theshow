import { fileURLToPath, URL } from 'node:url'
import { dirname } from 'path'
import path from 'node:path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  //mode 기반으로 env 파일 호출
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      },
    },
    base: '/',
    server: {
      host: env.VITE_LOCAL_SERVER_URL,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\api/, ''),
        },
      },
    },
  }
})
