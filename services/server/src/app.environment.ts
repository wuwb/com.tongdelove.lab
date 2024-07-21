export const environment = process.env.NODE_ENV || 'development'
export const isDevMode = Object.is(environment, 'development')
export const isProdMode = Object.is(environment, 'production')

export const enableSwagger = Object.is(process.env.ENABLE_SWAGGER, 'true')
export const enableOtelJaeger = Object.is(
  process.env.ENABLE_OTEL_JAEGER,
  'true'
)
export const serviceDomain = process.env.SERVER_DOMAIN
export const currentAppInstanceId = process.env.NODE_APP_INSTANCE || 0
export const disableHSTS = Object.is(
  process.env.STRICT_TRANSPORT_SECURITY,
  'false'
)

// whether or not enable cache for Fusion API
export const isApiCacheEnabled = Object.is(process.env.API_CACHEABLE, 'true')

// whether or not enable scheduler. (only for one instance, should use zookeeper if there are multiple instances)
export const enableScheduler = Object.is(process.env.ENABLE_SCHED, 'true')

// whether or not enable queue worker. (individual instances in worker queue mode to handle messages)
export const enableQueueWorker = Object.is(
  process.env.ENABLE_QUEUE_WORKER,
  'true'
)

// whether or not enable socket. (data collaboration middleware)
export const enableSocket = Object.is(process.env.ENABLE_SOCKET, 'true')

// project root directory
export const PROJECT_DIR = __dirname

// default language
export const defaultLanguage = process.env.DEFAULT_LANGUAGE || 'en-US'

export const supportedLanguages = process.env.SUPPORTED_LANGUAGES
  ? process.env.SUPPORTED_LANGUAGES.split(',')
  : ['zh-CN', 'en-US']
export const skipUsageVerification = Object.is(
  process.env.SKIP_USAGE_VERIFICATION,
  'true'
)
/**
 * whether show anonymous person in room.
 */
export const showAnonymous: boolean = Object.is(
  process.env.SHOW_ANONYMOUS || 'true',
  'true'
)
