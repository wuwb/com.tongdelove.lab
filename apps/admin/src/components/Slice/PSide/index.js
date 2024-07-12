import Konva from 'konva'
import { Component } from 'react'
import { Shape } from 'react-konva'

class Pa extends Component {
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor(),
    })
  }

  render() {
    let { origin, options } = this.props
    let {
      pThickness,

      paddingLeft,
      paddingTop,

      pLength,
      pDeepth,
      pWidth,

      paType,
      pbType,
      pcType,

      paHeight,
      paWidth,

      pbHeight,
      pbWidth,

      pcHeight,
      pcRadius,

      pdWidth,
      pdLength,

      dashStyle,
    } = options

    let startPoint = []
    startPoint[0] = 0
    startPoint[1] = pWidth + pcHeight + pcRadius + pThickness

    let SecondPoint = []
    SecondPoint[0] = startPoint[0] + pWidth
    SecondPoint[1] = startPoint[1]

    let ThirdPoint = []
    ThirdPoint[0] = SecondPoint[0]
    ThirdPoint[1] = SecondPoint[1] + pDeepth

    let FourthPoint = []
    FourthPoint[0] = startPoint[0]
    FourthPoint[1] = ThirdPoint[1]

    return (
      <Shape
        sceneFunc={(ctx, shape) => {
          ctx.beginPath()
          ctx.setLineDash([2, 2])
          ctx.moveTo(...startPoint)
          ctx.lineTo(...SecondPoint)
          ctx.stroke()
          ctx.closePath()

          ctx.beginPath()
          ctx.setLineDash(dashStyle)
          ctx.moveTo(...SecondPoint)
          ctx.lineTo(...ThirdPoint)
          ctx.stroke()
          ctx.closePath()

          ctx.beginPath()
          ctx.setLineDash(dashStyle)
          ctx.moveTo(...ThirdPoint)
          ctx.lineTo(...FourthPoint)
          ctx.stroke()
          ctx.closePath()

          ctx.beginPath()
          ctx.setLineDash([])
          ctx.moveTo(...FourthPoint)
          ctx.lineTo(...startPoint)
          ctx.stroke()
          ctx.closePath()

          // (!) Konva specific method, it is very important
          ctx.fillStrokeShape(shape)
        }}
      />
    )
  }
}

export default Pa
