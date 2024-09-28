import { defineConfig } from '@mikro-orm/postgresql';
import process from 'node:process';

const env = process.env;

// no need to specify the `driver` now, it will be inferred automatically
export default defineConfig({
  dbName: env.DATABASE_NAME_TEST,
  entities: ['./src/lib/database/schema/**/*.{ts,js}', './node_modules/@tony-stark-eth/lucia-mikro-orm-adapter/dist/**/*.{ts,js}'],
  host: env.DATABASE_HOST,
  password: env.DATABASE_PASSWORD_TEST,
  schema: env.DATABASE_NAME_TEST,
  user: env.DATABASE_USER_TEST,
});
