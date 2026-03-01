import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    resolve: {
        alias: {
            '@test': path.resolve(__dirname, 'resources/ts/test'),
            '@central': path.resolve(__dirname, 'resources/ts/central'),
            '@tenant': path.resolve(__dirname, 'resources/ts/tenant'),
            '@shared': path.resolve(__dirname, 'resources/ts/shared'),
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/ts/central/app.tsx', 'resources/ts/tenant.tsx'],
            refresh: true,
        }),
        tanstackRouter({
            routesDirectory: path.resolve(__dirname, 'resources/ts/central/routes'),
            generatedRouteTree: path.resolve(__dirname, 'resources/ts/central/routeTree.gen.ts'),
            target: 'react',
            autoCodeSplitting: true,
        }),
        tanstackRouter({
            routesDirectory: path.resolve(__dirname, 'resources/ts/tenant/routes'),
            generatedRouteTree: path.resolve(__dirname, 'resources/ts/tenant/routeTree.gen.ts'),
            target: 'react',
            autoCodeSplitting: true,
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
