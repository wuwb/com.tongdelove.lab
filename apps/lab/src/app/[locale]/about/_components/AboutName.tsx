'use client'

import { useSearchParams } from 'next/navigation'
import { TbMoon } from 'react-icons/tb'
import { PageWrapper } from '@/components/custom-ui/PageWrapper'

export const AboutName = () => {
  const searchParams = useSearchParams()
  const name = searchParams?.get('name')

  return (
    <PageWrapper>
      <TbMoon />
      <div>
        <code>{name}</code>
      </div>
    </PageWrapper>
  )
}
