import { registerAs } from '@nestjs/config';

export default registerAs('postgres', () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  database: process.env.POSTGRES_DATABASE || 'postgres',
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true' ? true : false,
  logging: process.env.POSTGRES_LOGGING === 'true' ? true : false,
}));
