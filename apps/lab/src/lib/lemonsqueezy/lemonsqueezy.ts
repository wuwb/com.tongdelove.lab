import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'
import { env } from '@/env/client'

lemonSqueezySetup({
  apiKey: env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY,
  onError: (error) => console.error('Error!', error),
})
