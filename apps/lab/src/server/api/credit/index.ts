import Stripe from 'stripe'
import stripe from '@/lib/stripe'

export async function createStripeCheckoutSession({
  userId,
  cents,
  name,
  description,
  successUrl,
  cancelUrl,
}: {
  userId: string
  cents: number
  name: string
  description: string
  successUrl: string | undefined
  cancelUrl: string | undefined
}): Promise<Stripe.Response<Stripe.Checkout.Session>> {
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name,
            description,
          },
          unit_amount: cents,
        },
        quantity: 1,
      },
    ],
    client_reference_id: userId,
    mode: 'payment',
    success_url: successUrl ?? 'https://lab.printlake.com',
    cancel_url: cancelUrl ?? 'https://lab.printlake.com',
  })
}
