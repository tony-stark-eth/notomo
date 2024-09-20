import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';
import { svelteTesting } from '@testing-library/svelte/vite';
import process from 'node:process';

export default defineConfig({
  plugins: [svelte({ compilerOptions: { hmr: !process.env.VITEST } }), svelteTesting()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['test/**/*.{test,spec}.ts'],
    exclude: ['test/e2e/**/*.{test,spec}.ts'],
    setupFiles: ['./test/setupTest.js'],
    coverage: {
      provider: 'istanbul',
      reporter: ['lcov', 'html'],
      include: ['src/**'],
      reportsDirectory: 'build/coverage',
      reportOnFailure: true,
    },
  },
});
