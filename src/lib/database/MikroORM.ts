import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import { MikroORM as MikroORMFactory } from '@mikro-orm/postgresql';

const entities = ['./node_modules/@tony-stark-eth/lucia-mikro-orm-adapter/dist/**/*.{ts,js}', './src/lib/database/schema/**/*.{js}'];

if (!building) {
  entities.pop();
  entities.push('./src/lib/database/schema/**/*.{ts,js}');
}

export const MikroORM = await MikroORMFactory.init({
  dbName: env.DATABASE_NAME,
  entities: entities,
  host: env.DATABASE_HOST,
  password: env.DATABASE_PASSWORD,
  schema: env.DATABASE_NAME,
  user: env.DATABASE_USER,
});
