import React from 'react'
import Image from 'next/image'
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu'
import { getChildrenToRender } from '@/utils/utils'

export class Header3 extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      phoneOpen: undefined,
    }
  }

  phoneClick = () => {
    const phoneOpen = !this.state.phoneOpen
    this.setState({
      phoneOpen,
    })
  }

  render() {
    const { dataSource, isMobile, ...props }: any = this.props
    const { phoneOpen } = this.state
    const navData = dataSource.Menu.children
    const navChildren = navData.map((item) => {
      const { children: a, subItem, ...itemProps } = item
      if (subItem) {
        return (
          <MenuContent
            key={item.name}
            {...itemProps}
            title={
              <div
                {...a}
                className={`header3-item-block ${a.className}`.trim()}
              >
                {a.children.map(getChildrenToRender)}
              </div>
            }
            popupClassName="header3-item-child"
          >
            {subItem.map(($item, ii) => {
              const { children: childItem } = $item
              const child = childItem.href ? (
                <a {...childItem}>
                  {childItem.children.map(getChildrenToRender)}
                </a>
              ) : (
                <div {...childItem}>
                  {childItem.children.map(getChildrenToRender)}
                </div>
              )
              return (
                <MenuItem key={$item.name || ii.toString()} {...$item}>
                  {child}
                </MenuItem>
              )
            })}
          </MenuContent>
        )
      }
      return (
        <MenuItem key={item.name} {...itemProps}>
          <a {...a} className={`header3-item-block ${a.className}`.trim()}>
            {a.children.map(getChildrenToRender)}
          </a>
        </MenuItem>
      )
    })
    const moment = phoneOpen === undefined ? 300 : null
    return (
      <div
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        {...dataSource.wrapper}
        {...props}
      >
        <div
          {...dataSource.page}
          className={`${dataSource.page.className}${phoneOpen ? 'open' : ''}`}
        >
          <div
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            {...dataSource.logo}
          >
            <Image
              className="w-full"
              src={dataSource.logo.children}
              alt="img"
            />
          </div>
          {isMobile && (
            <div
              {...dataSource.mobileMenu}
              onClick={() => {
                this.phoneClick()
              }}
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <div
            {...dataSource.Menu}
            animation={
              isMobile
                ? {
                    x: 0,
                    height: 0,
                    duration: 300,
                    onComplete: (e: any) => {
                      if (this.state.phoneOpen) {
                        e.target.style.height = 'auto'
                      }
                    },
                    ease: 'easeInOutQuad',
                  }
                : null
            }
            moment={moment}
            reverse={!!phoneOpen}
          >
            <MenuRoot>{navChildren}</MenuRoot>
          </div>
        </div>
      </div>
    )
  }
}
