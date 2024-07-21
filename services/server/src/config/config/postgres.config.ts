import { registerAs } from '@nestjs/config'

export default registerAs('postgres', () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 54321,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true' ? true : false,
  logging: process.env.POSTGRES_LOGGING === 'true' ? true : false,
}))
