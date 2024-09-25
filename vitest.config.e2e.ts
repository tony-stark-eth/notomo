import { sveltekit } from '@sveltejs/kit/vite';
import process from 'node:process';
import Icons from 'unplugin-icons/vite';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
  plugins: [
    sveltekit(),
    Icons({
      compiler: 'svelte',
    }),
  ],
  test: {
    env: loadEnv(mode, process.cwd(), ''),
    environment: 'jsdom',
    globals: true,
    include: ['test/e2e/**/*.{test,spec}.ts'],
    testTimeout: 5000,
  },
}));
