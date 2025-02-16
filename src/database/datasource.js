const { DataSource } = require('typeorm');
require('dotenv').config();
const path = require('path');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/modules/**/*.entity.js'], // Ensure it's JS after compile
  migrations: [path.join(__dirname, 'migrations/*.js')],
  synchronize: false,
  logging: true,
});

module.exports = { AppDataSource };
