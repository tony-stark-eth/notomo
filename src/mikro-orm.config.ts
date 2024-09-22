import { defineConfig } from '@mikro-orm/postgresql';
import process from 'node:process';

const env = process.env;

// no need to specify the `driver` now, it will be inferred automatically
export default defineConfig({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  dbName: env.DATABASE_NAME,
  schema: env.DATABASE_NAME,
  entities: ['./src/lib/database/schema/**/*.{ts,js}'],
});
