import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Line, Shape } from 'react-konva';
import Konva from 'konva';

class Pb extends Component {

  static defaultProps = {
    origin: [0, 0],
  };

  render() {
    let { origin, options } = this.props;
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
    } = options;

    let startPoint = [];
    startPoint[0] = 0;
    startPoint[1] = pWidth + pcHeight + pcRadius + pThickness - paHeight;

    let SecondPoint = [];
    SecondPoint[0] = startPoint[0] + paWidth;
    SecondPoint[1] = startPoint[1];

    let ThirdPoint = [];
    ThirdPoint[0] = startPoint[0] + pWidth;
    ThirdPoint[1] = startPoint[1] + paHeight;

    let FourthPoint = [];
    FourthPoint[0] = startPoint[0];
    FourthPoint[1] = ThirdPoint[1];

    return (
      <Shape
        sceneFunc={(ctx, shape) => {
          ctx.beginPath();

          ctx.beginPath();
          ctx.moveTo(...startPoint);
          ctx.lineTo(...SecondPoint);
          ctx.lineTo(...ThirdPoint);
          ctx.stroke();
          ctx.closePath();

          ctx.beginPath();
          ctx.setLineDash(dashStyle);
          ctx.moveTo(...ThirdPoint);
          ctx.lineTo(...FourthPoint);
          ctx.stroke();
          ctx.closePath();

          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.moveTo(...FourthPoint);
          ctx.lineTo(...startPoint);
          ctx.stroke();
          ctx.closePath();

          // (!) Konva specific method, it is very important
          ctx.fillStrokeShape(shape);
        }}
      />
    );
  }
}

export default Pb;
