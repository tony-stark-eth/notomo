import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import process from 'node:process';
import Icons from 'unplugin-icons/vite';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
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
    env: loadEnv(mode, process.cwd(), ''),
    environment: 'jsdom',
    exclude: ['test/e2e/**/*.{test,spec}.ts'],
    globals: true,
    include: ['test/**/*.{test,spec}.ts'],
    setupFiles: ['./test/setupTest.js'],
  },
}));
