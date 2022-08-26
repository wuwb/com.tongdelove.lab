import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Line } from 'react-konva';
import { Normal as NormalBox } from '@/website/components/Box';
import Portal from './Portal';

class App extends Component {
  state = {
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
  };

  constructor(props) {
    super(props);
    this.handleChangeWidth = this.handleChangeWidth.bind(this);
    this.handleChangeHeight = this.handleChangeHeight.bind(this);
  }

  handleChangeWidth(e) {
    this.setState({
      paWidth: Number(e.currentTarget.value),
    });
  }

  handleChangeHeight(e) {
    this.setState({
      paHeight: Number(e.currentTarget.value),
    });
  }

  render() {
    let pThickness = 0.05;
    let paddingLeft = 10;
    let paddingTop = 10;

    let pLength = 80;
    let pDeepth = 100;
    let pWidth = 30;

    let paType = 1;
    let pbType = 1;
    let pcType = 1;

    let paHeight = 15;
    let paWidth = 20;

    let pbHeight = 15;
    let pbWidth = 20;

    let pcHeight = 10;
    let pcRadius = 5;

    let pdWidth = 10;
    let pdLength = 90;

    console.log('this.state: ', this.state);

    return (
      <div>
        <Stage width={800} height={600}>
          <Layer>
            <Portal>
              <input
                className="input"
                value={this.state.paHeight}
                onChange={this.handleChangeHeight}
              />
            </Portal>
            <NormalBox></NormalBox>
          </Layer>
        </Stage>
        <style jsx>
          {`
            .input {
              position: absolute;
              top: 10px;
              left: 10px;
            }
          `}
        </style>
        <div>
          <input value={this.state.paWidth} onChange={this.handleChangeWidth} />
        </div>
      </div>
    );
  }
}

export default App;
