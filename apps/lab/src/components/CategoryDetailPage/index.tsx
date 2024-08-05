import { CategoryLayout } from '../CategoryPage/CategoryLayout'
import { useRouter } from 'next/router';
import Link from 'next/link'

export const CategoryDetailPage = () => {
  const router = useRouter()

  return (
    <CategoryLayout>
      <Link
        href={{
          pathname: '/links/[level1]/[level2]',
          query: {
            level1: router.query.categoryId,
            level2: 'test'
          },
        }}
      >导航</Link>
    </CategoryLayout>
  )
}
