import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { Toaster } from '@/components/StickerPage/components/sonner'
import { useTranslation } from '@/i18n'
import { StickerExplorePage } from '@/components/StickerExplorePage/index'
import { PageContainer } from '@/components/Layout/PageContainer'
import { buildSharedServerSideProps } from '@/server/common/factory'

const StickerExplore = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()

  return (
    <>
      <NextSeo
        title={t(
          'My Stickers | Your Personalized Sticker Creations - Printlake Lab'
        )}
        description={t(
          "Welcome to My Stickers! Here, you can view, manage, and showcase all the stickers you've created. Customize and edit your designs, or download them to share with friends. Your creativity is just a click away—let's make your sticker collection uniquely yours!"
        )}
      />
      <PageContainer>
        <StickerExplorePage />
      </PageContainer>
      <Toaster richColors />
    </>
  )
}

export default StickerExplore

export const getServerSideProps = buildSharedServerSideProps(async () => {
  return {
    props: {},
  }
})
