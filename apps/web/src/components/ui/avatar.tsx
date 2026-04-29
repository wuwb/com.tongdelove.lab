'use client'

import * as React from 'react'
import {
  Avatar as ShadAvatar,
  AvatarImage,
  AvatarFallback,
} from '@tongdelove/ui/components/avatar'

export interface AvatarProps extends React.ComponentProps<typeof ShadAvatar> {
  name?: string
  src?: string
  icon?: React.ReactNode
  fallback?: React.ReactNode
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof ShadAvatar>,
  AvatarProps
>(function Avatar(props, ref) {
  const { name, src, icon, fallback, ...rest } = props
  return (
    <ShadAvatar ref={ref} {...rest}>
      <AvatarFallback className="text-xs font-medium">
        {fallback || (name ? getInitials(name) : icon)}
      </AvatarFallback>
      {src && <AvatarImage src={src} />}
    </ShadAvatar>
  )
})

function getInitials(name: string) {
  const names = name.trim().split(' ')
  const firstName = names[0] || ''
  const lastName = names.length > 1 ? names[names.length - 1] : ''
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0)
}

export const AvatarGroup = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div className={`flex -space-x-3 ${className || ''}`} {...props} />
)
