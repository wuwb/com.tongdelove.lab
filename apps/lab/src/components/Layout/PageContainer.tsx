import { cn } from '@tongdelove/ui/lib/utils'
import clsx from 'clsx'
import React from 'react'

interface PageContainerProps {
  /**
   * Whether to hide the scroll bars of the container.
   */
  hideScrollBars?: boolean
  relative?: boolean
  childrenClassName?: string
  children: React.ReactNode
}

/**
 * A wrapper component for pages.
 * This component is primarily designed for use with the Layout component located at `/apps/lab/src/components/_v2/Layout/index.tsx`.
 *
 * @param children The content to be wrapped by the PageContainer.
 * @param childrenClassName The class name to be applied to the children.
 * @param relative Whether to set the container to `position: relative`. Default is `false`.
 * @param hideScrollBars Whether to hide the scroll bars of the container. Default is `false`.
 *
 * @example
 * ```tsx
 * <PageContainer>
 *  <PromptDetailspagePage prompt={prompt} />
 * </PageContainer>
 * ```
 */

export const PageContainer = ({
  children,
  hideScrollBars = false,
  relative = false,
  childrenClassName,
}: PageContainerProps) => {
  return (
    <div
      className={clsx('h-mobileScreen mobile:pt-0 overflow-hidden', {
        relative: relative,
      })}
    >
      {/* INFO: 64px is Bottom MobileNavbar */}
      <div
        className={clsx(
          'overflow-y-scroll overscroll-y-none  md:rounded-lg',
          hideScrollBars ? 'scrollbar-hide' : 'dark-scroll-bar'
        )}
        id="scrollableDiv"
      >
        <div
          className={cn(
            'bg-fgMain-950 mobile:pb-0 pb-2.5 md:rounded-lg',
            childrenClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

PageContainer.displayName = 'PageContainer'
