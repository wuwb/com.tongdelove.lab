import { request } from '@umijs/max'
import React from 'react'

export default class Pie extends React.Component {
  state = {
    option: {
      title: {
        text: '开发占比',
        top: 8,
        left: 8,
      },
      tooltip: {
        formatter: ['0,0'],
      },
      label: {
        formatter: '{b}\n{d}%',
      },
      legend: {
        bottom: 10,
      },
      series: [],
    },
  }

  componentDidMount() {
    request('/api/charts/pie.json', {}).then((data) => {
      this.setState({
        option: {
          ...this.state.option,
          series: {
            name: '开发占比',
            type: 'pie',
            center: ['50%', '46%'],
            radius: ['40%', '50%'],
            data,
          },
        },
      })
    })
  }

  render() {
    const { option } = this.state
    return <div style={{ background: '#fff' }}></div>
  }
}
