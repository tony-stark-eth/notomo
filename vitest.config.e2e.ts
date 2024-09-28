import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: 'svelte',
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['test/e2e/**/*.{test,spec}.ts'],
  },
});
