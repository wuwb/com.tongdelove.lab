import clsx from 'clsx'
import { MenuItems } from './MenuItems'
import styles from './DropdownMenu.module.scss'

interface DropdownMenuProps {
  submenus: any
  dropdown: any
  depthLevel: any
}

export const DropdownMenu = ({
  submenus,
  dropdown,
  depthLevel,
}: DropdownMenuProps) => {
  depthLevel = depthLevel + 1

  const dropdownClass = depthLevel > 1 ? styles['dropdown-submenu'] : ''
  const hoverClass = dropdown ? styles['dropdown-menu-hover'] : ''

  return (
    <div className={clsx(styles['dropdown-menu'], dropdownClass, hoverClass)}>
      <div className={styles['dropdown-menu-inner']}>
        {submenus.map((submenu, index) => {
          return (
            <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
          )
        })}
      </div>
    </div>
  )
}
