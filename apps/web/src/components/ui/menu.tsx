'use client'

import * as React from 'react'
import * as ShadDropdown from '@tongdelove/ui/components/dropdown-menu'
import { LuChevronRight } from 'react-icons/lu'

export const MenuRoot = ShadDropdown.DropdownMenu
export const MenuTrigger = ShadDropdown.DropdownMenuTrigger
export const MenuContent = ShadDropdown.DropdownMenuContent
export const MenuItem = ShadDropdown.DropdownMenuItem
export const MenuSeparator = ShadDropdown.DropdownMenuSeparator
export const MenuLabel = ShadDropdown.DropdownMenuLabel
export const MenuGroup = ShadDropdown.DropdownMenuGroup
export const MenuCheckboxItem = ShadDropdown.DropdownMenuCheckboxItem
export const MenuRadioItem = ShadDropdown.DropdownMenuRadioItem
export const MenuRadioItemGroup = ShadDropdown.DropdownMenuRadioGroup

export interface MenuTriggerItemProps
  extends React.ComponentProps<typeof ShadDropdown.DropdownMenuItem> {
  startIcon?: React.ReactNode
}

export const MenuTriggerItem = React.forwardRef<
  React.ElementRef<typeof ShadDropdown.DropdownMenuItem>,
  MenuTriggerItemProps
>(function MenuTriggerItem(props, ref) {
  const { startIcon, children, ...rest } = props
  return (
    <ShadDropdown.DropdownMenuItem ref={ref} {...rest}>
      {startIcon}
      {children}
      <LuChevronRight className="ml-auto h-4 w-4" />
    </ShadDropdown.DropdownMenuItem>
  )
})
