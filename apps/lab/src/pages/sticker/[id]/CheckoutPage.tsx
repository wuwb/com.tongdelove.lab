import { Elements } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import {
  useStripe,
  useElements,
  ExpressCheckoutElement,
} from '@stripe/react-stripe-js'

const Checkout = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState()

  const [visibility, setVisibility] = useState('hidden')

  const expressCheckoutOptions = {
    // Specify a type per payment method
    // Defaults to 'buy' for Google and 'plain' for Apple
    buttonType: {
      googlePay: 'checkout',
      applePay: 'check-out',
    },
    // Specify a theme per payment method
    // Default theme is based on appearance API settings
    buttonTheme: {
      applePay: 'white-outline',
    },
    // Height in pixels. Defaults to 44. The width is always '100%'.
    buttonHeight: 55,
  }

  const onReady = ({ availablePaymentMethods }) => {
    if (!availablePaymentMethods) {
      // No buttons will show
    } else {
      // Optional: Animate in the Element
      setVisibility('initial')
    }
  }

  const onClick = ({ resolve }) => {
    const options = {
      emailRequired: true,
      phoneNumberRequired: true,
      shippingAddressRequired: false,
      allowedShippingCountries: ['US'],
      shippingRates: [
        {
          id: 'free-shipping',
          displayName: 'Free shipping',
          amount: 0,
          deliveryEstimate: {
            maximum: { unit: 'day', value: 7 },
            minimum: { unit: 'day', value: 5 },
          },
        },
      ],
      lineItems: [
        {
          name: 'Sample item',
          amount: 1000,
        },
        {
          name: 'Tax',
          amount: 100,
        },
        {
          name: 'Shipping cost',
          amount: 1000,
        },
      ],
    }
    resolve(options)
  }

  const onShippingAddressChange = async ({ resolve, address }) => {
    const response = await fetch('/calculate-shipping', {
      data: JSON.stringify({
        shippingAddress: address,
      }),
    })
    const result = await response.json()
    resolve({
      lineItems: result.updatedLineItems,
    })
  }

  const onShippingRateChange = async ({ resolve, shippingRate }) => {
    const response = await fetch('/calculate-and-update-amount', {
      data: JSON.stringify({
        shippingRate: shippingRate,
      }),
    })
    const result = await response.json()
    elements.update({ amount: result.amount })
    resolve({
      lineItems: result.updatedLineItems,
    })
  }

  const onCancel = () => {
    elements?.update({ amount: 1099 })
  }

  const onConfirm = async (event) => {
    if (!stripe) {
      // Stripe.js hasn't loaded yet.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setErrorMessage(submitError.message)
      return
    }

    // Create a ConfirmationToken using the details collected by the Express Checkout Element
    const { error, confirmationToken } = await stripe.createPaymentMethod({
      elements,
      params: {
        payment_method_data: {
          billing_details: {
            name: 'Jenny Rosen',
          },
        },
        return_url: 'https://example.com/order/123/complete',
      },
    })

    if (error) {
      // This point is only reached if there's an immediate error when
      // creating the ConfirmationToken. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message)
    }

    // Send the ConfirmationToken ID to your server for additional logic and attach the ConfirmationToken
    const res = await fetch('/create-intent', {
      method: 'POST',
      body: confirmationToken.id,
    })
    const { client_secret: clientSecret } = await res.json()

    // Confirm the PaymentIntent
    const { error: confirmError } = await stripe.confirmPayment({
      clientSecret,
      confirmParams: {
        confirmation_token: confirmationToken.id,
      },
    })

    if (confirmError) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(confirmError.message)
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }
  }

  return (
    <div id="checkout-page">
      <div id="express-checkout-element" style={{ display: visibility }}>
        <ExpressCheckoutElement
          options={expressCheckoutOptions}
          onConfirm={onConfirm}
          onReady={onReady}
          onClick={onClick}
          onShippingAddressChange={onShippingAddressChange}
          onShippingRateChang={onShippingRateChange}
          onCancel={onCancel}
        />
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </div>
  )
}

export default Checkout
