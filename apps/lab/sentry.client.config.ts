// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  denyUrls: ['http://localhost:3000'],

  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
  beforeSend: async (event, hint) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry event', event)
      console.log('Sentry hint', hint)
    }
    return Promise.resolve(event)
  },
  ignoreErrors: [
    'UNAUTHORIZED',
    'Fetch is aborted',
    'You do not have permission to perform this action',
    'Something went wrong',
    'Context length error',
    'The chat could not be deleted, please try again',
    /**
     * @link https://github.com/WICG/ResizeObserver/issues/38#issuecomment-422126006,
     * @link https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded/50387233#50387233
     */
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    'Failed to load script', // user network error, not our fault
    'The user aborted a request', // user network error, not our fault
    'Cancel rendering route', // user network error, not our fault
    'Load failed', // too generic, could be anything, focus on detail error in this stage
    'Failed to fetch', // too generic, could be anything, focus on detail error in this stage
    'viewerId is not a string', // too many, ignore it for save quota
  ],

  // Adjust this value in production, or use tracesSampler for greater control
  // @see https://develop.sentry.dev/sdk/performance/
  tracesSampleRate: 0.2,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    new Sentry.Replay({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
})
