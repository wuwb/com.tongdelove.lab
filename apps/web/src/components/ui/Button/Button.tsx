import React from 'react'
import cx from 'clsx'

import styles from './Button.module.css'

type IButtonType = 'button' | 'submit' | 'reset'

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-gray-50:text-blue-600',
  inverse: 'bg-white text-blue-600 hover:bg-blue-600:text-white',
  danger: 'bg-red-600 text-white hover:bg-red-50:text-red-600',
}

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
}

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined }

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  isLoading?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
} & IconProps

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      title = '',
      type = 'button' as IButtonType,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      startIcon = null,
      endIcon = null,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          'flex items-center justify-center rounded-md border border-gray-300 font-medium shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-70',
          variants[variant],
          sizes[size],
          className,
          styles.button
        )}
        {...props}
        title={title}
        disabled={disabled}
        onClick={onClick}
      >
        {/* {isLoading && <Spinner size="sm" className="text-current" />} */}
        {!isLoading && startIcon}
        <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      </button>
    )
  }
)
