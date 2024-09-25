import { env } from '$env/dynamic/private';
import { MikroORM as MikroORMFactory } from '@mikro-orm/postgresql';

export const MikroORM = await MikroORMFactory.init({
  dbName: env.DATABASE_NAME,
  entities: ['./src/lib/database/schema/**/*.{ts,js}', './node_modules/@tony-stark-eth/lucia-mikro-orm-adapter/dist/**/*.{ts,js}'],
  host: env.DATABASE_HOST,
  password: env.DATABASE_PASSWORD,
  schema: env.DATABASE_NAME,
  user: env.DATABASE_USER,
});
