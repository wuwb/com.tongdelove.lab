
import { NextApiRequest, NextApiResponse } from 'next'
import Strap from 'strip'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const stripe = Strap("sk_test_51PxVobHVzRJLjT1QAYaxxJiy0VTHQMs1Y6KWjj0Iy6vlYi9iwnBDUNGEonIlaKPyqP3I8aivB6dPrj5ibWMlS5BG00vG6q3Nhk", {
    apiVersion: "2024-06-20",
    stripeAccount: '{{CONNECTED_ACCOUNT_ID}}',
  });


  const intent = await stripe.paymentIntents.create({
    // To allow saving and retrieving payment methods, provide the Customer ID.
    customer: customer.id,
    amount: 1099,
    currency: 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true
    },
  });
  return res.status(200).json({client_secret: intent.client_secret});
}
