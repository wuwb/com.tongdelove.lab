import { menuData } from './menuData'
import { MenuItems } from './MenuItems'

export function Navbar() {
  return (
    <div className="ml-6 hidden flex-1 items-center text-sm font-medium text-gray-800 md:flex">
      {menuData.map((menu, index) => {
        const depthLevel = 0
        return <MenuItems key={index} items={menu} depthLevel={depthLevel} />
      })}
    </div>
  )
}
