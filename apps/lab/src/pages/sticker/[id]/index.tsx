import Image from 'next/image'
import { Card, Text, Title, Button, Group, Stack, Loader } from '@mantine/core'
import { trpc } from '@/utils/trpc'
import { buildSharedServerSideProps } from '@/server/common/factory'
import { useRouter } from 'next/router'
import { useTranslation } from '@/i18n'
import { useUserStore } from '@/stores'
import { useEffect } from 'react'

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

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      // show login modal
      console.log('not logined')
      return
    }

    try {
      const result = await purchaseMutation.mutateAsync({
        id,
        successUrl: new URL(
          `${window.location.href}?success=true`
        ).toString(),
        cancelUrl: window.location.href,
      })
      console.log('result: ', result)
      if (!result) {
        throw new Error()
      }
      router.push(result?.url)
    } catch (err) {
      console.log('error: ', err)
    }
  }

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
          <Button onClick={handlePurchase} variant="light" color="blue" radius="md">
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
