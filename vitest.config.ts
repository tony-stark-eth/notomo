import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import process from 'node:process';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [svelte({ compilerOptions: { hmr: !process.env.VITEST } }), svelteTesting()],
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
