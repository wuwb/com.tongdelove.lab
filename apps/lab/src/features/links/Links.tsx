import { DaohangCard } from './DaohangCard'
import { navs } from './nav'
import { LinksNav } from './LinksNav'

function renderSidebar() {
  const scrollToLinkSection = (item: string) => {
    const section = document.querySelector(`#${item}`)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      {navs.map(list => {
        return (
          <div key={list.name}>
            <div
              className="px-0.5 py-1 hover:bg-[#ff5a00] hover:text-white hover:rounded"
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

function renderNav() {
  return navs.map(list => {
    return (
      <div id={list.name} key={list.name}>
        <h3 className="py-2.5">{list.name}</h3>
        <div className="grid grid-cols-6 gap-4">
          {list.children.map(item => {
            return <DaohangCard key={item.name} item={item} />
          })}
        </div>
      </div>
    )
  })
}

export function Daohang() {
  return (
    <div>
      <LinksNav />
      <div className="container mx-auto mt-10 flex justify-between">
        <div className="basis-1/12 w-[30%]">{renderSidebar()}</div>
        <div className="basis-11/12 w-[70%]">{renderNav()}</div>
      </div>
      <div>
        <p>如需添加站点，请发邮件联系：541330190@qq.com</p>
      </div>
    </div>
  )
}
