'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@tongdelove/ui/components/accordion'
import Link from 'next/link'
import categoryDate from '@/data/config/category.yml'

export const LinksSidebar = () => {
  const data: any = []

  return (
    <div className="sidebar-nav fade animate-nav sticky w-[170px] shrink-0 border-r border-solid">
      <div className="modal-dialog h-100 sidebar-nav-inner">
        <div className="sidebar-logo border-bottom border-color">
          <div className="logo overflow-hidden">
            <a href="" className="logo-expanded">
              <img src="" height="40" className="logo-light" alt="" />
              <img src="" height="40" className="logo-dark d-none" alt="" />
            </a>
            <a href="" className="logo-collapsed">
              <img src="" height="40" className="logo-light" alt="" />
              <img src="" height="40" className="logo-dark d-none" alt="" />
            </a>
          </div>
        </div>

        <div className="sidebar-menu flex-fill">
          <Accordion type="multiple">
            {categoryDate.map((category, index) => {
              return (
                <AccordionItem value={category.slug} key={index}>
                  <AccordionTrigger className="px-2">
                    {category.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    {category.list.map((item, index) => {
                      return (
                        <Link
                          key={index}
                          className="block"
                          href={{
                            pathname: '/category/[categoryId]',
                            query: {
                              categoryId: item.slug,
                            },
                          }}
                        >
                          {item.title}
                        </Link>
                      )
                    })}
                  </AccordionContent>
                </AccordionItem>
              )
            })}

            <AccordionItem value="agriculture">
              <AccordionTrigger className="px-2">农业</AccordionTrigger>
              <AccordionContent>
                <div>农业</div>
                <div>牧业</div>
                <div>渔业</div>
                <div>林业</div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="humanities">
              <AccordionTrigger className="px-2">人文</AccordionTrigger>
              <AccordionContent>
                <div>文学</div>
                <div>哲学</div>
                <div>艺术</div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="society">
              <AccordionTrigger className="px-2">社会</AccordionTrigger>
              <AccordionContent>
                <div>军事</div>
                <div>政治</div>
                <div>法律</div>
                <div>经济</div>
                <div>教育</div>
                <div>管理</div>
                <div>宗教</div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* <div className="border-top py-2 border-color">
            <div className="flex-bottom">
              <ul>
                <li id="menu-item-237"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-237 sidebar-item">
                  <a href="/" target="_blank">
                    <span className="fas fa-file-upload icon-fw icon-lg mr-2"></span>
                    <span>网站提交</span>
                  </a>
                </li>

                <li id="menu-item-212"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-212 sidebar-item">
                  <a href="/" className="smooth">
                    <span className="fab fa-staylinked icon-fw icon-lg mr-2"></span>
                    <span>友情链接</span>
                  </a>
                </li>

                <li id="menu-item-213"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-213 sidebar-item">
                  <a target="_blank" rel="noopener" href="/">
                    <span className="fa fa-info-circle icon-fw icon-lg mr-2"></span>
                    <span>关于导航</span>
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
      </div>
    </div>
  )
}
