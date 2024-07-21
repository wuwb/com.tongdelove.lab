import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 54321,
  database: process.env.DATABASE_DATABASE,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' ? true : false,
  logging: process.env.DATABASE_LOGGING === 'true' ? true : false,
}))
