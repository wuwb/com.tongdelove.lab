import { TimePicker } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

const { RangePicker } = TimePicker

export default class TimeRangePicker extends React.Component {
  onFormatChange = (time, timeString) => {
    const { valueFormat, onChange } = this.props
    let finalTime = time || []

    finalTime = finalTime.map((t, i) => {
      let finalT
      if (valueFormat === 'utc') {
        finalT = t ? t.valueOf() : null
      } else {
        finalT = timeString[i]
      }
      return finalT
    })

    if (onChange) {
      onChange(finalTime, timeString)
    }
  }
  render() {
    const { valueFormat, value, ...restProps } = this.props
    let finalValue = value
    if (value) {
      finalValue = value.map((v) => {
        if (valueFormat === true) {
          return dayjs(v, restProps.format)
        } else {
          return dayjs(v)
        }
      })
    }
    return (
      <RangePicker
        {...restProps}
        {...(valueFormat ? { onChange: this.onFormatChange } : {})}
        value={finalValue}
      />
    )
  }
}
