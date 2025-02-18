import { config } from 'dotenv';

config();

const {
  DB_TYPE,
  DATABASE_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_HOST,
} = process.env;

export const type = DB_TYPE;
export const host = POSTGRES_HOST;
export const port = DATABASE_PORT;
export const username = POSTGRES_USER;
export const password = POSTGRES_PASSWORD;
export const database = POSTGRES_DB;
export const migrations = ['/src/database/migrations/*{.ts,.js}'];
export const entities = ['/src/**/*.entity.{ts,js}'];
export const cli = {
  migrationsDir: 'src/database/migrations',
};