import React, { Component } from 'react'

type Props = {
  getState: (setOpen: (open: boolean, index: number) => void) => void
  images: string[]
}

export class Lightbox extends Component<
  Props,
  {
    isOpen: boolean
    photoIndex: number
  }
> {
  constructor(props) {
    super(props)

    this.state = {
      photoIndex: 0,
      isOpen: false,
    }
    this.props.getState(this.setOpen)
  }

  setOpen = (open: boolean, index: number) => {
    this.setState({ isOpen: open, photoIndex: index })
  }

  render() {
    const { photoIndex, isOpen } = this.state
    const { images } = this.props
    this.props.getState(this.setOpen)

    // 显示 images

    return <>{isOpen && <div>images</div>}</>
  }
}
