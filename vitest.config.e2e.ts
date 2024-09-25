import { svelte } from '@sveltejs/vite-plugin-svelte';
import process from 'node:process';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [svelte({ compilerOptions: { hmr: !process.env.VITEST } })],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['test/e2e/**/*.{test,spec}.ts'],
  },
});
