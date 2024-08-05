
import { Daohang } from '@/components/LinksPage/Links'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { LinksLevel2Layout } from '@/components/LinksPage/LinksLevel2Layout'
import { LinksNav } from '../LinksPage/LinksNav'

export const LinksLevel2Page = () => {
  const router = useRouter()

  const [links, setLinks] = useState<any>([])

  const fetchLinks = async (router) => {
    const links = (await import(`@/data/links/${router.query.level1}/${router.query.level2}.yml`)).default
    setLinks(links)
  }

  useEffect(() => {
    if (!router.query.level1 || !router.query.level2) {
      return
    }
    fetchLinks(router)
  }, [router])

  return (
    <LinksLevel2Layout>
      <div className="bg-gray-100 p-4">
        <LinksNav />
        {
          links.map((item, index) => {
            const Links = item?.list?.map((link, index) => (
              <Fragment key={index}>
                <div className="d-flex flex-fill" >
                  <h4 className="text-gray text-lg mb-4">
                    <i className="site-tag iconfont icon-tag icon-lg mr-1"></i>
                    {link?.term}
                  </h4>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {
                    link.links.map((link, index) => (
                      <div className="url-card col-6 col-sm-6 col-md-4 col-xl-5a col-xxl-6a ">
                        <div className="url-body default">
                          <a
                            href={link.url}
                            target="_blank"
                            className="group bg-white border-0 mb-4 shadow-md transition duration-300 ease-in-out block rounded"
                            style={{
                              boxShadow: '0px 0px 20px -5px rgba(158, 158, 158, 0.2)'
                            }}
                          >
                            <div className="p-3">
                              <div className="flex items-center">
                                <div className="mr-2 flex items-center justify-center overflow-hidden w-10 h-10 bg-black shrink-0">
                                  <img
                                    src={link.logo}
                                    alt={link.title}
                                  />
                                </div>
                                <div className="url-info flex-fill">
                                  <div className="text-sm font-bold line-clamp-1 group-hover:text-[#f1404b]">
                                    {link.title}
                                  </div>
                                  <p className="m-0 text-xs line-clamp-1">
                                    {link.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </a>
                          <a href={link.url} className="togo text-center text-muted is-views" data-id="689"
                            data-toggle="tooltip" data-placement="right" title="直达" rel="nofollow">
                            <i className="iconfont icon-goto"></i>
                          </a>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </Fragment>
            ))
            return (
              <div key={index} className="mt-2">
                {Links}
              </div>
            )
          })
        }
        <Daohang />
      </div>
    </LinksLevel2Layout >
  )
}
