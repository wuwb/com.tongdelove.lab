'use client'

import { Fragment, memo, useEffect, useState } from 'react'
import Link from 'next/link'
import { CategoryLayout } from './LinksPage/CategoryLayout'
import { LinksPage } from './LinksPage'
import { useRouter } from '@/lib/compat/router'

const Category = memo((props) => {
  const router = useRouter()

  const [links, setLinks] = useState<any>([])

  const fetchLinks = async (router) => {
    const links = (
      await import(
        `@/data/links/${router.query.level1}/${router.query.level2}.yml`
      )
    ).default
    setLinks(links)
  }

  useEffect(() => {
    if (!router.query.level1 || !router.query.level2) {
      return
    }
    fetchLinks(router)
  }, [router])

  return (
    <CategoryLayout>
      category homepage
      <LinksPage />
    </CategoryLayout>
  )
})

Category.displayName = 'Category'

export default Category
