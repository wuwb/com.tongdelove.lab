import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import type { Page } from '@commerce/types/page'
// import getSlug from '@lib/get-slug'
// import {  div } from '@/components/ui'
// import { I18nWidget } from '@/components/common'
import s from './Footer.module.css'

interface FooterProps {
  className?: string
  children?: any
  pages?: any[]
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
]

const Footer = ({ className, pages }: FooterProps) => {
  const { sitePages } = usePages(pages)
  const rootClassName = clsx(s.root, className)

  return (
    <footer className={rootClassName}>
      <div>
        <div className="grid grid-cols-1 gap-8 border-b border-accent-2 bg-primary py-12 text-primary transition-colors duration-150 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-2"></div>
          <div className="col-span-1 lg:col-span-8">
            <div className="grid md:grid-flow-col md:grid-cols-3 md:grid-rows-4">
              {[...links, ...sitePages].map((page) => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link
                    href={page.url!}
                    className="text-accent-9 transition duration-150 ease-in-out hover:text-accent-6"
                  >
                    {page.name}
                  </Link>
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-1 flex items-start text-primary lg:col-span-2 lg:justify-end">
            <div className="flex h-10 items-center space-x-6">
              {/* <I18nWidget /> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between space-y-4 pb-10 pt-6 text-sm text-accent-6 md:flex-row">
          <div>
            <span>&copy; 2020 Printlake. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function usePages(pages?: any[]) {
  const { locale } = useRouter()
  const sitePages: any[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url // && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: any, b: any) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
