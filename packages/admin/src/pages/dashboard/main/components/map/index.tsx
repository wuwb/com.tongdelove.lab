import { request } from '@umijs/max';
import React from 'react';

export default class Pie extends React.Component {
  state = {
    option: {
      title: {
        text: '区域信息',
        top: 8,
        left: 8,
      },
      tooltip: {},
      visualMap: {
        min: 1,
        max: 20,
        show: false,
      },
      visualMap: {
        right: 16,
        min: 0,
        max: 20,
        calculable: true,
      },
      series: {
        name: '区（市县）',
        type: 'map',
        map: 'hangzhou',
        zoom: 1,
        data: [],
      },
    },
  };

  componentDidMount() {
    request('/api/charts/map.json', {}).then((data) => {
      this.setState({
        option: {
          ...this.state.option,
          series: {
            ...this.state.option.series,
            data,
          },
        },
      });
    });
  }

  render() {
    const { option } = this.state;
    return <div style={{ background: '#fff' }}></div>;
  }
}
