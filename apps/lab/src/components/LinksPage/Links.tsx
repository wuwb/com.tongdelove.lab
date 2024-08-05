import { DaohangCard } from './DaohangCard'
import { navs } from './nav'



function renderNav() {
  return navs.map((list) => {
    return (
      <div id={list.name} key={list.name}>
        <h3 className="py-2.5">{list.name}</h3>
        <div className="grid grid-cols-4 gap-4">
          {list.children.map((item) => {
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
      <div className="flex">
        <div className="basis-11/12">{renderNav()}</div>
      </div>
      <div>
        <p>如需添加站点，请发邮件联系：541330190@qq.com</p>
      </div>
    </div>
  )
}
