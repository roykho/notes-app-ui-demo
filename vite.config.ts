/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailiwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [react(), tailiwindcss()],
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_API_URL || 'http://127.0.0.1:8000',
                    changeOrigin: true,
                    secure: false
                }
            }
        },
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['./src/test/setup.ts'],
        },
    }
})
