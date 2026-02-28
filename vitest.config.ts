import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./resources/ts/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/ts'),
      '@central': path.resolve(__dirname, 'resources/ts/central'),
      '@tenant': path.resolve(__dirname, 'resources/ts/tenant'),
      '@shared': path.resolve(__dirname, 'resources/ts/shared'),
    },
  },
});
