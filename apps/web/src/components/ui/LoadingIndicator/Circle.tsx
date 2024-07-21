import React from 'react'
import styled from '@emotion/styled'

export const Circle = (props) => {
  const CirclePrimitive = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    ${props.rotate &&
    `
      -webkit-transform: rotate(${props.rotate}deg);
      -ms-transform: rotate(${props.rotate}deg);
      transform: rotate(${props.rotate}deg);
    `} &:before {
      display: block;
      width: 15%;
      height: 15%;
      margin: 0 auto;
      background-color: #999;
      border-radius: 100%;
      content: '';
      ${props.delay &&
      `
        -webkit-animation-delay: ${props.delay}s;
        animation-delay: ${props.delay}s;
      `};
    }
  `
  return <CirclePrimitive />
}
