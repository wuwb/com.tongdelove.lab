import { CategoryLayout } from '../CategoryPage/CategoryLayout'
import indexData from '@/data/links/index.yml'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from '@/i18n'
import { useEffect, useState } from 'react'
import { navs } from '../LinksPage/nav'

export const LinksLevel2Layout = (props) => {
  const { t } = useTranslation()
  const router = useRouter()

  const [links, setLinks] = useState<any>([])

  const renderSidebar = () => {
    const scrollToLinkSection = (item: string) => {
      const section = document.querySelector(`#${item}`)
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
      <div className="p-1">
        {navs.map((list) => {
          return (
            <div key={list.name}>
              <div
                className="px-0.5 py-1 hover:rounded hover:bg-[#ff5a00] hover:text-white"
                onClick={() => {
                  scrollToLinkSection(list.name)
                }}
              >
                {list.name}
              </div>
            </div>
          )
        })}

      </div>
    )
  }

  const fetchLinks = async (router) => {
    const links = (await import(`@/data/links/${router.query.level1}/menu.yml`)).default
    setLinks(links)
  }

  useEffect(() => {
    if (!router.query.level1) {
      return
    }
    fetchLinks(router)
  }, [router])

  return (
    <CategoryLayout>
      <div className="w-[120px] shrink-0 border-r">
        <div className="sidebar-scroll">
          <div className="sidebar-menu-inner">
            <div className="rounded px-2 py-1 bg-gray-100 m-1">{t('领域')}</div>
            <ul>
              {
                indexData?.map((item, index) => {
                  return (
                    <li key={index} className="px-3 py-2 hover:bg-gray-100">
                      <Link className="smooth change-href"
                        href={{
                          pathname: '/links/[leve1]/[level2]',
                          query: {
                            leve1: 1,
                            level2: 2,
                          },
                        }}
                      >
                        <span className={clsx(item.icon)}></span>
                        <span>{item?.taxonomy}</span>
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
            {renderSidebar()}

          </div>
        </div>
      </div>
      {props.children}
    </CategoryLayout>
  )
}
