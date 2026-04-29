import React from 'react'
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
  AccordionRoot,
} from '@/components/ui/accordion'

export class Feature6 extends React.PureComponent<any, any> {
  carouselRef: any
  constructor(props) {
    super(props)
    this.carouselRef = React.createRef()
    this.state = {
      current: 0,
    }
  }

  onTitleClick = (_, i) => {
    const carouselRef = this.carouselRef.current.childRefs.carousel
    carouselRef.goTo(i)
  }

  onBeforeChange = (_, newIndex) => {
    this.setState({
      current: newIndex,
    })
  }

  getChildrenToRender = (dataSource) => {
    const { current }: any = this.state
    const { Carousel } = dataSource
    const {
      titleWrapper,
      children: childWrapper,
      wrapper,
      ...carouselProps
    } = Carousel

    const { barWrapper, title: titleChild, ...titleWrapperProps } = titleWrapper
    const titleToRender: JSX.Element[] = []

    const childrenToRender = childWrapper.map((item, ii) => {
      const { title, children, ...itemProps } = item
      titleToRender.push(
        <div
          {...title}
          key={ii.toString()}
          onClick={(e) => {
            this.onTitleClick(e, ii)
          }}
          className={
            ii === current ? `${title.className || ''} active` : title.className
          }
        >
          {title.children}
        </div>
      )
      const childrenItem = children.map(($item, i) => {
        const { number, children: child, ...childProps } = $item
        const numberChild = number.children.replace(/[^0-9.-]/g, '')
        const { unit, toText, ...numberProps } = number
        return (
          <div {...childProps} key={i.toString()}>
            <div
              {...numberProps}
              animation={{
                Children: {
                  value: parseFloat(numberChild),
                  floatLength:
                    parseFloat(numberChild) -
                      Math.floor(parseFloat(numberChild)) >
                    0
                      ? 2
                      : 0,
                  formatMoney: true,
                },
                duration: 1000,
                delay: 300,
                ease: 'easeInOutCirc',
              }}
              component="span"
            >
              0
            </div>
            {unit && <span {...unit}>{unit.children}</span>}
            <p {...child}>{child.children}</p>
          </div>
        )
      })
      return (
        <AccordionItem key={ii.toString()} value={ii.toString()}>
          <div type="bottom" {...itemProps}>
            {childrenItem}
          </div>
        </AccordionItem>
      )
    })

    const width = 100 / childrenToRender.length
    return (
      <div
        key="queue"
        leaveReverse
        type="bottom"
        delay={[0, 100]}
        {...wrapper}
        ref={this.carouselRef}
      >
        <div {...titleWrapperProps} key="title">
          <div {...titleChild}>
            {titleToRender}
            <div
              {...barWrapper}
              style={{
                width: `${width}%`,
                left: `${width * current}%`,
              }}
            >
              <em {...barWrapper.children} />
            </div>
          </div>
        </div>
        <AccordionRoot
          {...carouselProps}
          key="carousel"
          infinite={false}
          beforeChange={this.onBeforeChange}
        >
          {childrenToRender}
        </AccordionRoot>
      </div>
    )
  }

  render() {
    const { dataSource, isMobile, ...props }: any = this.props
    return (
      <div {...props} {...dataSource.wrapper}>
        <div>
          <div {...dataSource.div}>{this.getChildrenToRender(dataSource)}</div>
        </div>
      </div>
    )
  }
}
