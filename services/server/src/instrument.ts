const Sentry = require('@sentry/nestjs')

// Ensure to call this before requiring any other modules!
Sentry.init({
  // dsn: 'https://05ac67c844be45c084bd33ac842cde2f@o88417.ingest.sentry.io/4504961869676544',
  dsn: 'https://b11388002bd0be861ca41f7e13a6c55b@o1412964.ingest.us.sentry.io/4509496404606976',
  logLevels: ['debug'],
  environment: process.env.NODE_ENV ?? 'development',
  tracesSampleRate: 1.0,
  // Sentry.Integrations.Http 对wss连接会报错，默认禁用掉
  defaultIntegrations: false,
  enableTracing: false,
})
