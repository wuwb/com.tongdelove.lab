import { notFound } from 'next/navigation'
import { trpc } from "@/trpc/server";

export default async function Page() {
  console.log('trpc: ', )

  const data = await trpc.poem.count()
  // const data2 = await trpc.auth.getSecretMessage()

  console.log('data: ', data)

  return <div>poem index</div>
}
