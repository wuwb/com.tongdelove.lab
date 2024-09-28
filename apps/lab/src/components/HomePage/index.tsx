import { CtaBlock, HeroBlock } from './blocks'
import { useTranslation } from '@/i18n'
import { Faq } from '@/components/Faq/Faq'
import Generator from '@/components/StickerPage/generator'
import { trpc } from '@/utils/trpc'
import { notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { toast } from 'sonner'
import { Shows } from '@/components/StickerPage/Shows'
import { HeaderMegaMenu } from '@/components/Layout/components/BaseLayout/Header'
import { FollowUsOnX } from '@/components/FollowUsOnX'
import { Toaster } from '@/components/StickerPage/components/sonner'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core'
import Link from 'next/link'

export const HomePage = () => {
  const { t } = useTranslation()

  return (
    <div className="pb-20">
      <div className="flex-center flex-wrap sm:flex-nowrap sm:gap-20 sm:px-48">
        <div className="md:p-15 w-full p-5 sm:w-1/2 sm:p-10 sm:pr-0 lg:p-16">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section component="a" href="/sticker" className="p-5 pb-0">
              <Image
                src="/images/sticker/placeholder.png"
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{t('贴纸生成器')}</Text>
            </Group>

            <Text size="sm" c="dimmed">
              {t(
                '使用我们的贴纸生成器，轻松创建独特、个性化的贴纸。只需输入简单描述，即可生成各种风格的可爱贴纸。适用于社交媒体、个人收藏或商业用途。让您的创意瞬间变为现实！'
              )}
            </Text>

            <Button
              component={Link}
              href="/sticker"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
            >
              {t('Checkout')}
            </Button>
          </Card>
        </div>
        <div className="md:p-15 -mt-5 w-full p-5 sm:mt-0 sm:w-1/2 sm:p-10 sm:pl-0 lg:p-16">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section component="a" href="/logo-gen" className="p-5 pb-0">
              <Image
                src="/images/home/placeholder.png"
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{t('LOGO 生成器')}</Text>
            </Group>

            <Text size="sm" c="dimmed">
              {t(
                '用我们的LOGO和Favicon生成器，轻松创建专业、独特的品牌标识。只需输入您的品牌名称和配置，即可生成多种尺寸的LOGO和Favicon。适用于网站、应用程序等多种场景。让您的品牌在竞争中脱颖而出，留下深刻印象！'
              )}
            </Text>

            <Button
              component={Link}
              href="/logo-gen"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
            >
              {t('Go and Play')}
            </Button>
          </Card>
        </div>
      </div>
      <FollowUsOnX />
    </div>
  )
}
