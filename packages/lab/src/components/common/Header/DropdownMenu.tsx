import cx from 'clsx';
import styles from './DropdownMenu.module.scss';
import { MenuItems } from './MenuItems';

export function DropdownMenu({ submenus, dropdown, depthLevel }) {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? styles['dropdown-submenu'] : "";
    const hoverClass = dropdown ? styles['dropdown-menu-hover'] : "";
    return (
        <div className={cx(styles['dropdown-menu'], dropdownClass, hoverClass)}>
            <div className={styles['dropdown-menu-inner']}>
                {submenus.map((submenu, index) => {
                    return (
                        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
                    );
                })}
            </div>
        </div>
    );
}
