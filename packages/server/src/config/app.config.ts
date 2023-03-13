import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  timezone: process.env.TZ,
  environment: process.env.NODE_ENV,
  secretKey: process.env.SECRET_KEY,
  url: process.env.PUBLIC_URL || 'http://localhost:3000',

  env: process.env.APP_ENV,
  name: process.env.APP_NAME,
  port: process.env.APP_PORT || 3100,
  sentryDsn: process.env.SENTRY_DSN || "https://10b7afa890874c64afa9bdb3560f4d7a@o1412964.ingest.sentry.io/6752568",
}));
