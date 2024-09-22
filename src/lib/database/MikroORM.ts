import { MikroORM as MikroORMFactory } from '@mikro-orm/postgresql';
import { env } from '$env/dynamic/private';

export const MikroORM = await MikroORMFactory.init({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  dbName: env.DATABASE_NAME,
  schema: env.DATABASE_NAME,
  entities: ['./src/lib/database/schema/**/*.{ts,js}'],
});
