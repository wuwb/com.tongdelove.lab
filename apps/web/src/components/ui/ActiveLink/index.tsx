import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, cloneElement } from 'react'

type ActiveLinkChildProps = {
  className?: string
}

interface ActiveLinkProps extends LinkProps {
  children: ReactElement<ActiveLinkChildProps>
  activeClassName: string
}

export const ActiveLink = ({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) => {
  const { asPath } = useRouter()

  const className = asPath === rest.href ? activeClassName : ''
  const childClassName = children.props.className ?? ''
  const mergedClassName = `${childClassName} ${className}`.trim() || undefined

  return (
    <Link {...rest}>
      {cloneElement<ActiveLinkChildProps>(children, {
        className: mergedClassName,
      })}
    </Link>
  )
}
