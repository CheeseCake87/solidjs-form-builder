import {defineConfig} from 'vite'
import solidPlugin from 'vite-plugin-solid'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        solidPlugin(),
        tailwindcss(),
    ],
    root: 'src',
    server: {
        host: '127.0.0.1',
        port: 5111
    },
    build: {
        target: 'esnext',
        outDir: '../dist',
        emptyOutDir: true,
    },
})
