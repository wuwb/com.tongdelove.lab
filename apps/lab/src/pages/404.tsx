import { NotFoundPage } from '@/components/system/pages'
import { Button } from '@tongdelove/ui/components/button'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from '@/i18n'
import { NextSeo } from 'next-seo'

const Custom404 = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo
        title={t(
          'Multi-Tool Online Toolkit - Solve Everyday Tasks Quickly and Efficiently - Printlake Lab'
        )}
        description={t(
          "Welcome to our online multi-tool hub, offering a range of free utilities from encoding and decoding, image editing to unit conversions. Whether you're a student, developer, or professional, our tools are designed to enhance your productivity. Experience user-friendly design combined with powerful functionality – try it out now!"
        )}
      />
      <NotFoundPage />;
      <div className="flex h-full flex-1 flex-col">
        <div className="align-center flex w-full flex-1 justify-center p-6">
          <div>
            <div className="text-center">
              <Image
                alt="404"
                height={180}
                width={180}
                src="/images/status/404.svg"
              />
              <h2>
                {/* {t("The page you were looking for doesn't exist.")} */}
              </h2>
              <h4>
                {/* {t("It's on us, we moved the content to a different page. The search below should help!")} */}
              </h4>
            </div>
            <div className="bg-white">
              <div className="mt-3 p-4 text-center">
                <div>
                  <Button variant="contained" size="small">
                    {t('Search')}
                  </Button>
                </div>
                <Button>{/* {t('Go to homepage')} */}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Custom404
