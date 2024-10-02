import { defineConfig } from '@mikro-orm/postgresql';
import process from 'node:process';
import { loadEnv } from 'vite';

let viteEnvMode = '';
const indexModeOption = process.argv.indexOf('--mode');

if (indexModeOption !== -1) {
  viteEnvMode = process.argv[indexModeOption + 1];
}

const env = loadEnv(viteEnvMode, process.cwd(), '');

// no need to specify the `driver` now, it will be inferred automatically
export default defineConfig({
  dbName: env.DATABASE_NAME,
  entities: ['./src/lib/database/schema/**/*.{ts,js}', './node_modules/@tony-stark-eth/lucia-mikro-orm-adapter/dist/**/*.{ts,js}'],
  host: env.DATABASE_HOST,
  password: env.DATABASE_PASSWORD,
  schema: env.DATABASE_NAME,
  seeder: {
    path: './src/seeders',
  },
  user: env.DATABASE_USER,
});
