import React from 'react'
import { useSearchParams } from 'next/navigation'
import { TbMoon } from 'react-icons/tb'
// import { useDarkMode } from '@/hooks'
import { PageWrapper } from '@/components/ui/'

import type { AnyAaaaRecord } from 'dns'

export const AboutName: React.FC<AnyAaaaRecord> = (props) => {
  // useDarkMode()
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
