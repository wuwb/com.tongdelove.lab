import { Daohang } from '@/components/LinksPage/Links'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { CategoryLayout } from './CategoryLayout'
import Link from 'next/link'
import { LinksPage } from '../LinksPage'

export const CategoryPage = () => {
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
}
