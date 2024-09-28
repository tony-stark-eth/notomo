import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    sveltekit(),
    svelteTesting(),
    Icons({
      compiler: 'svelte',
    }),
  ],
  test: {
    coverage: {
      include: ['src/**'],
      provider: 'istanbul',
      reporter: ['lcov', 'html'],
      reportOnFailure: true,
      reportsDirectory: 'build/coverage',
    },
    environment: 'jsdom',
    exclude: ['test/e2e/**/*.{test,spec}.ts'],
    globals: true,
    include: ['test/**/*.{test,spec}.ts'],
    setupFiles: ['./test/setupTest.js'],
  },
});
