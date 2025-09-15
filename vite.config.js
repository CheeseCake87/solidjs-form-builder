import {defineConfig} from 'vite'
import solidPlugin from 'vite-plugin-solid'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        solidPlugin(),
        tailwindcss(),
    ],
    root: '.',
    build: {
        target: 'esnext',
        outDir: '../dist',
        emptyOutDir: true,
    },
})
