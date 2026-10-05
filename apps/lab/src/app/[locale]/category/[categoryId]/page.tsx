'use client'

import { CategoryLayout } from '@/components/LinksPage/CategoryLayout'
import { useRouter } from '@/lib/compat/router'
import Link from 'next/link'

const CategoryDetail = () => {
  const router = useRouter()

  return (
    <CategoryLayout>
      <Link
        href={{
          pathname: '/links/[level1]/[level2]',
          query: {
            level1: router.query.categoryId,
            level2: 'test',
          },
        }}
      >
        导航
      </Link>
    </CategoryLayout>
  )
}

export default CategoryDetail
