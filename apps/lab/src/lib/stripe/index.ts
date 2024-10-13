import { env } from '@/env/server'
import Stripe from 'stripe'

export default new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
  typescript: true,
})
