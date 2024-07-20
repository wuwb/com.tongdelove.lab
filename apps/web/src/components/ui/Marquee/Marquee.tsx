import clsx from 'clsx'
import s from './Marquee.module.css'
import { FC, ReactNode, Component, Children } from 'react'
import { default as FastMarquee } from 'react-fast-marquee'

interface MarqueeProps {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  variant?: 'primary' | 'secondary'
}

export const Marquee: FC<MarqueeProps> = ({
  className = '',
  children,
  variant = 'primary',
}) => {
  const rootClassName = clsx(
    s.root,
    {
      [s.primary]: variant === 'primary',
      [s.secondary]: variant === 'secondary',
    },
    className
  )

  return (
    <FastMarquee gradient={false} className={rootClassName}>
      {Children.map(children, (child) => ({
        ...child,
        props: {
          ...child.props,
          className: clsx(child.props.className, `${variant}`),
        },
      }))}
    </FastMarquee>
  )
}
