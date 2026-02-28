import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    resolve: {
        alias: {
            '@test': path.resolve(__dirname, 'resources/test'),
            '@central': path.resolve(__dirname, 'resources/ts/central'),
            '@tenant': path.resolve(__dirname, 'resources/ts/tenant'),
            '@shared': path.resolve(__dirname, 'resources/ts/shared'),
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/ts/central.tsx', 'resources/ts/tenant.tsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
