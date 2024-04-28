import React from 'react'
import { useSearchParams } from 'next/navigation'
import { IconMoon } from '@tabler/icons-react'
// import { useDarkMode } from '@/hooks'
import { PageWrapper } from '@/components/ui/'

import type { AnyAaaaRecord } from 'dns'

export const AboutName: React.FC<AnyAaaaRecord> = props => {
  // useDarkMode()
  const searchParams = useSearchParams()
  const name = searchParams?.get('name')

  return (
    <PageWrapper>
      <IconMoon />
      <div>
        <code>{name}</code>
      </div>
    </PageWrapper>
  )
}
