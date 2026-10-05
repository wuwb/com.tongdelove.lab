import { trpc } from '@/utils/trpc'

export const useLogoGen = () => {
  const { data: examples = [] } = trpc.faviconGen.listHomePage.useQuery()

  return {
    examples,
  }
}
