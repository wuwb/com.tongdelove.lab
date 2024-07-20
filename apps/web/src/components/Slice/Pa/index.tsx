import React, { Component } from 'react'
import { Stage, Layer, Rect, Text, Line, Shape } from 'react-konva'
import Konva from 'konva'

interface Props {
  options: any
  origin?: [number, number]
}

const Pa = (props: Props) => {
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
  } = props.options

  let startPoint: [number, number] = [0, 0]
  startPoint[0] = 0
  startPoint[1] = pWidth + pcHeight + pcRadius + pThickness - paHeight

  let SecondPoint: [number, number] = [0, 0]
  SecondPoint[0] = startPoint[0] + paWidth
  SecondPoint[1] = startPoint[1]

  let ThirdPoint: [number, number] = [0, 0]
  ThirdPoint[0] = startPoint[0] + pWidth
  ThirdPoint[1] = startPoint[1] + paHeight

  let FourthPoint: [number, number] = [0, 0]
  FourthPoint[0] = startPoint[0]
  FourthPoint[1] = ThirdPoint[1]

  return (
    <Shape
      sceneFunc={(ctx, shape) => {
        ctx.beginPath()

        ctx.beginPath()
        ctx.moveTo(...startPoint)
        ctx.lineTo(...SecondPoint)
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

export default Pa
