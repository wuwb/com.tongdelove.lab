'use client'

import * as React from 'react'
import { Button } from './button'
import { Input } from './input'
import { LuCheck, LuClipboard, LuLink } from 'react-icons/lu'

export interface ClipboardRootProps extends React.ComponentProps<'div'> {
  value: string
}

export const ClipboardRoot = React.forwardRef<
  HTMLDivElement,
  ClipboardRootProps
>(function ClipboardRoot(props, ref) {
  const { value, className, children, ...rest } = props
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={ref} className={className} {...rest}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        return React.cloneElement(child as React.ReactElement<any>, {
          copied,
          onCopy: handleCopy,
        })
      })}
    </div>
  )
})

export const ClipboardButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & {
    copied?: boolean
    onCopy?: () => void
  }
>(function ClipboardButton(props, ref) {
  const { copied, onCopy, className, ...rest } = props
  return (
    <Button
      ref={ref}
      size="sm"
      variant="outline"
      onClick={onCopy}
      className={className}
      {...rest}
    >
      {copied ? (
        <LuCheck className="mr-2 h-4 w-4" />
      ) : (
        <LuClipboard className="mr-2 h-4 w-4" />
      )}
      {copied ? 'Copied' : 'Copy'}
    </Button>
  )
})

export const ClipboardLink = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & {
    copied?: boolean
    onCopy?: () => void
  }
>(function ClipboardLink(props, ref) {
  const { copied, onCopy, className, ...rest } = props
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="sm"
      onClick={onCopy}
      className={className}
      {...rest}
    >
      <LuLink className="mr-2 h-4 w-4" />
      {copied ? 'Copied' : 'Copy'}
    </Button>
  )
})

export const ClipboardIconButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & {
    copied?: boolean
    onCopy?: () => void
  }
>(function ClipboardIconButton(props, ref) {
  const { copied, onCopy, className, ...rest } = props
  return (
    <Button
      ref={ref}
      size="icon"
      variant="ghost"
      onClick={onCopy}
      className={className}
      {...rest}
    >
      {copied ? (
        <LuCheck className="h-4 w-4" />
      ) : (
        <LuClipboard className="h-4 w-4" />
      )}
    </Button>
  )
})

export const ClipboardInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(function ClipboardInput(props, ref) {
  return <Input ref={ref} {...props} />
})

export const ClipboardLabel = React.forwardRef<
  HTMLLabelElement,
  React.ComponentProps<'label'>
>(function ClipboardLabel(props, ref) {
  const { className, ...rest } = props
  return (
    <label
      ref={ref}
      className={`mb-1 block text-sm font-medium ${className}`}
      {...rest}
    />
  )
})
