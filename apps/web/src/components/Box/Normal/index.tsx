import React, { useState, memo } from 'react'
import ReactKonva, {
  Stage,
  Layer,
  Rect,
  Text,
  Line,
  Group,
  Transformer,
} from 'react-konva'
import { Pa, PMain, PSide } from '../../Slice'

export const Normal = memo(() => {
  const [state, setState] = useState({
    dashStyle: [3, 3],

    pThickness: 0.05,

    paddingLeft: 10,
    paddingTop: 10,

    pLength: 80,
    pDeepth: 100,
    pWidth: 30,

    paType: 1,
    pbType: 1,
    pcType: 1,

    paHeight: 15,
    paWidth: 20,

    pbHeight: 15,
    pbWidth: 20,

    pcHeight: 10,
    pcRadius: 5,

    pdWidth: 10,
    pdLength: 9,
  })

  const handleClick = (e) => {
    setState({
      ...state,
      paWidth: Number(e.currentTarget.value),
    })
  }

  let pThickness = 0.05
  let paddingLeft = 10
  let paddingTop = 10

  let pLength = 80
  let pDeepth = 100
  let pWidth = 30

  let paType = 1
  let pbType = 1
  let pcType = 1

  let paHeight = 15
  let paWidth = 20

  let pbHeight = 15
  let pbWidth = 20

  let pcHeight = 10
  let pcRadius = 5

  let pdWidth = 10
  let pdLength = 90

  const origin = [paddingLeft, paddingTop]

  return (
    <Group x={paddingLeft} y={paddingTop}>
      <Pa options={state}></Pa>
      <PMain options={state}></PMain>
      <PSide options={state}></PSide>
      <Transformer>
        <Pa options={state}></Pa>
      </Transformer>
    </Group>
  )
})

Normal.displayName = 'Normal'
