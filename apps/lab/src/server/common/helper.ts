import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'

export function buildFactorWithAdditionProps<T extends Record<string, any>>(
  additionalPropsFn: (context: GetServerSidePropsContext) => Promise<T> | T
) {
  return <Props>(fn?: GetServerSideProps<Partial<Props>>) => {
    const getServerSideProps = async (
      context: GetServerSidePropsContext
    ): Promise<GetServerSidePropsResult<Props>> => {
      const additionalProps = await additionalPropsFn(context)

      if (!fn) {
        return {
          props: {
            ...additionalProps,
          } as Props & T,
        }
      }

      const res = await fn(context)

      if ('props' in res) {
        return {
          ...res,
          props: {
            ...additionalProps,
            ...res.props,
          } as Props & T,
        }
      } else {
        // maybe redirect, not need translation
        return res
      }
    }

    return getServerSideProps
  }
}
