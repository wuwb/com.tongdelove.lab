import Image from 'next/image'
import { Card, Text, Title, Button, Group, Stack, Loader } from '@mantine/core'
import { trpc } from '@/utils/trpc'
import { buildSharedServerSideProps } from '@/server/common/factory'
import { useRouter } from 'next/router'
import { useTranslation } from '@/i18n'
import { useUserStore } from '@/stores'
import { useEffect } from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { CheckoutPage } from './CheckoutPage'

const stripePromise = loadStripe('pk_test_51PxVobHVzRJLjT1QYM385EGjK3lJDRPF5wFfIkjs3FSiW7zTiU6T7jCLmFLkAKOZZWsEuUk6iM1OUydPrZuJPO7o00RXLKrOct');

interface StickerDetailProps {
  id: string
}

function StickerDetail({ id }: StickerDetailProps) {
  const { t } = useTranslation()
  const router = useRouter()

  const isAuthenticated = useUserStore((store) => store.isAuthenticated)

  const { data: sticker, isLoading, error } = trpc.sticker.getById.useQuery({ id })
  const purchaseMutation = trpc.sticker.purchase.useMutation()

  console.log('sticker: ', sticker)

  const options = {
    mode: 'payment' as const,
    amount: 2100,
    currency: 'usd',
    testEnv: true,
    merchantCountryCode: 'US',
    merchantDisplayName: 'DisplayName',
    emailRequired: true,
    phoneNumberRequired: true,
    billingAddressRequired: false,
    shippingAddressRequired: false,
    applePay: 'always',
    googlePay: 'always',
    link: 'never',
    amazonPay: 'never',
    paypal: 'never',
    automatic_payment_methods: {
      enabled: true
    },
    capture_method: "automatic",
    payment_method_types: [
        "card",
        "link"
    ],
    appearance: {
      variables: {
        // This controls the border-radius of the rendered Express Checkout Element
        borderRadius: '4px'
      }
    },
    billingDetailsCollection: 'required',
    paymentMethodOptions: {
      card: {
        requestPaymentMethod: true
      }
    }
  };

  // const handlePurchase = async () => {
  //   if (!isAuthenticated) {
  //     // show login modal
  //     console.log('not logined')
  //     return
  //   }


  //   const appearance = { /* appearance */ }
  //   const options = { /* options */ }
  //   const elements = stripe.elements({
  //     mode: 'payment',
  //     amount: 1099,
  //     currency: 'usd',
  //     appearance,
  //   })
  //   const expressCheckoutElement = elements.create('expressCheckout', options)
  //   expressCheckoutElement.mount('#express-checkout-element')

  //   try {
  //     const result = await purchaseMutation.mutateAsync({
  //       id,
  //       successUrl: new URL(
  //         `${window.location.href}?success=true`
  //       ).toString(),
  //       cancelUrl: window.location.href,
  //     })
  //     console.log('result: ', result)
  //     if (!result) {
  //       throw new Error()
  //     }
  //     router.push(result?.url)
  //   } catch (err) {
  //     console.log('error: ', err)
  //   }
  // }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
      // Remove the 'success' query parameter from the URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('success');
      window.history.replaceState({}, document.title, newUrl.toString());
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="max-w-2xl mx-auto mt-8">
      <Card.Section>
        <Title order={2} mb="md">{sticker?.object}</Title>
      </Card.Section>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutPage />
      </Elements>
      <Stack>
        <div className="aspect-square relative mb-4">
          <Image
            src={sticker?.url ?? ''}
            alt={sticker?.object ?? ''}
            width="600"
            height="600"
            priority
          />
        </div>
        <Group>
          <Text>$1</Text>
          <Button variant="light" color="blue" radius="md">
            {t('立即购买')}
          </Button>
        </Group>
      </Stack>
    </Card>
  )
}

export default function StickerDetailPage() {
  const router = useRouter()
  const { id } = router.query

  if (typeof id !== 'string') {
    return <Text>Invalid sticker ID</Text>
  }

  return <StickerDetail id={id} />
}

export const getServerSideProps = buildSharedServerSideProps(async () => {
  return {
    props: {},
  }
})
