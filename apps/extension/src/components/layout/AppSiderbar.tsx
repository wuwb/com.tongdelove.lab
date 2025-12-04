import { useLayout } from '@/context/LayoutProvider'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarRail,
} from '@tongdelove/ui/components/sidebar'
// import { AppTitle } from './app-title'
import { sidebarData } from './data/SidebarData'
import { NavGroup } from '@/components/layout/NavGroup'
// import { NavUser } from './nav-user'
// import { TeamSwitcher } from './team-switcher'

export function AppSidebar() {
    const { collapsible, variant } = useLayout()
    // "offcanvas" | "icon" | "none"
    // "sidebar" | "floating" | "inset"
    return (
        <Sidebar>
            <SidebarHeader>
                {/* <TeamSwitcher teams={sidebarData.teams} /> */}
                {/* <AppTitle /> */}
            </SidebarHeader>
            <SidebarContent>
                {
                    sidebarData.navGroups.map((props) => (
                        <NavGroup key={props.title} {...props} />
                    ))
                }
            </SidebarContent>
            < SidebarFooter >
                {/* <NavUser user={sidebarData.user} /> */}
            </SidebarFooter>
            < SidebarRail />
        </Sidebar>
    )
}
