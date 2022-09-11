import { menuData } from './menuData';
import { MenuItems } from './MenuItems';

export function Navbar() {
    return (
        <div className="hidden md:flex flex-1 items-center text-sm font-medium text-gray-800 ml-6">
            {
                menuData.map((menu, index) => {
                    const depthLevel = 0;
                    return (
                        <MenuItems key={index} items={menu} depthLevel={depthLevel} />
                    );
                })
            }
        </div>
    );
}
