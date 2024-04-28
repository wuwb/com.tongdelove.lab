import { type Locale } from '@/i18n/config'
import { trpc } from '@/trpc/server'

type Props = {
  params: { id: string; lang: Locale }
  searchParams: { py?: string }
}

export default async function Page({ params, searchParams }: Props) {
  const poem = trpc.poem.findById.query({
    id: Number(params.id),
    lang: params.lang,
  })


  return <div>{poem}</div>
}
