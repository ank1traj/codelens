import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        sentryVitePlugin({
            org: 'ankitraj',
            project: 'codelens'
        })
    ],

    resolve: {
        alias: {
            '@': new URL('./src', import.meta.url).pathname
        }
    },

    build: {
        sourcemap: false
    }
})
