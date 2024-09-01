import { buildFactorWithAdditionProps } from '@/server/common/helper'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

/**
 * @example
 * export const getServerSideProps = buildI18NServerSideProps()
 *
 * export const getServerSideProps = buildI18NServerSideProps(({req}) => {...})
 */

export const buildI18NServerSideProps = buildFactorWithAdditionProps(
  async (context) => {
    const translationProps = await serverSideTranslations(
      context.locale ?? 'en',
      ['translation']
    )

    return translationProps
  }
)
