'use client'

import { useTranslation } from '@/i18n'
import { FollowUsOnX } from '@/components/FollowUsOnX'
import { Button } from '@tongdelove/ui/components/button'
import { Card, CardContent } from '@tongdelove/ui/components/card'
import Image from 'next/image'
import Link from 'next/link'

/**
 * 原实现用 getServerSideProps + buildSharedServerSideProps 注入 i18n/session/isMobile，
 * App Router 下这些由 [locale]/layout.tsx 的 Provider 栈提供，
 * 因此页面本身退化为对 client 组件的直接组合。
 *
 * 注意：本文件必须保持 Server Component —— ThreeItemGrid 会在服务端调用
 */
export default function IndexPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 w-full">
      <div className="max-w-5xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sticker Generator Card */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="relative w-full aspect-4/3 mb-6 rounded-md overflow-hidden bg-gray-50">
                <Image
                  src="/images/sticker/placeholder.png"
                  alt={t('贴纸生成器')}
                  fill
                  sizes="100vw"
                  className="object-contain p-4"
                />
              </div>

              <div className="flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-3">
                  {t('贴纸生成器')}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {t('使用我们的贴纸生成器，轻松创建独特、个性化的贴纸。只需输入简单描述，即可生成各种风格的可爱贴纸。适用于社交媒体、个人收藏或商业用途。让您的创意瞬间变为现实！')}
                </p>

                <Button asChild className="w-full">
                  <Link href="/sticker">
                    {t('Checkout')}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Logo Generator Card */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="relative w-full aspect-4/3 mb-6 rounded-md overflow-hidden bg-gray-50">
                <Image
                  src="/images/home/placeholder.png"
                  alt={t('LOGO 生成器')}
                  fill
                  sizes="100vw"
                  className="object-contain p-4"
                />
              </div>

              <div className="flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-3">
                  {t('LOGO 生成器')}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {t('用我们的LOGO和Favicon生成器，轻松创建专业、独特的品牌标识。只需输入您的品牌名称和配置，即可生成多种尺寸的LOGO和Favicon。适用于网站、应用程序等多种场景。让您的创意瞬间变为现实，打造独一无二的品牌形象！')}
                </p>

                <Button asChild className="w-full">
                  <Link href="/logo-gen">
                    {t('Go and Play')}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <FollowUsOnX />

      <div>Copyright © 2009-2026</div>
    </div>
  )
}
