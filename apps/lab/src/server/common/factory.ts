import { buildI18NServerSideProps } from '@/i18n/server'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { buildFactorWithAdditionProps } from './helper'
import isMobile from 'is-mobile'
import { auth } from '@/auth'

export function buildSharedStaticProps() {
  return buildI18NServerSideProps()
}

/**
 * use in getServerSideProps
 * its should be run everytime when load page from serverside
 * be careful add code here
 */
export function buildSharedServerSideProps<Props extends Record<string, any>>(
  fn: GetServerSideProps<Partial<Props>>,
  options?: {
  }
) {
  let _fn = fn

  return buildAuthServerSideProps(
    buildDeviceSizeServerSideProps(
      buildI18NServerSideProps(_fn)
    )
  ) as GetServerSideProps<Props>
}

const buildDeviceSizeServerSideProps = buildFactorWithAdditionProps(
  (context: GetServerSidePropsContext) => {
    return {
      isMobile: isMobile({
        ua: context.req.headers['user-agent'],
        tablet: true,
      }),
    }
  }
)

const buildAuthServerSideProps = buildFactorWithAdditionProps(
  async ({ req, res }) => {
    const session = await auth(req, res)

    return {
      session,
    }
  }
)
