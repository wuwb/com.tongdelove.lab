import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

/**
 * @example
 * export const getServerSideProps = buildI18NServerSideProps()
 *
 * export const getServerSideProps = buildI18NServerSideProps(({req}) => {...})
 */
export function buildI18NServerSideProps<Props extends Record<string, any>>(
  fn?: GetServerSideProps<Partial<Props>>
) {
  const getServerSideProps = async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<Props>> => {
    const translationProps = await serverSideTranslations(
      context.locale ?? 'en',
      ['translation']
    )

    if (!fn) {
      return {
        props: {
          ...translationProps,
        } as Props,
      }
    }

    const res = await fn(context)

    if ('props' in res) {
      return {
        ...res,
        props: {
          ...translationProps,
          ...res.props,
        } as Props,
      }
    } else {
      // maybe redirect, not need translation
      return res
    }
  }

  return getServerSideProps
}
