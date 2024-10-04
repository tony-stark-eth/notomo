import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import process from 'node:process';
import Icons from 'unplugin-icons/vite';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      sentrySvelteKit({
        sourceMapsUploadOptions: {
          org: env.SENTRY_ORG,
          project: env.SENTRY_PROJECT,
        },
      }),
      sveltekit(),
      Icons({
        compiler: 'svelte',
      }),
    ],
    server: {
      host: true,
    },
  };
});
