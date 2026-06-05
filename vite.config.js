import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const lambdaTarget = env.VITE_LAMBDA_URL

  return {
    plugins: [react()],
    server: lambdaTarget
      ? {
          proxy: {
            '/lambda': {
              target: lambdaTarget,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/lambda/, ''),
            },
          },
        }
      : {},
  }
})
