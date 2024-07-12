import { PageContainer } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { Card, Input, Typography } from 'antd'
import React, { useState } from 'react'

const PunctureResistance = (): React.ReactNode => {
  const intl = useIntl()
  let [param, seParam] = useState(0)

  function cal(e: any) {
    console.log(e)
    seParam(e.currentTarget.value)
  }

  return (
    <PageContainer>
      <Card>
        <Typography.Text strong>瓦楞纸板戳穿强度计算器</Typography.Text>
        <div>Puncture Energy Test: PET</div>
        <div>
          瓦楞纸板戳穿强度计算器是华印网为了方便纸箱行业人士计算瓦楞纸板的戳穿强度而开发的一个网页计算工具，戳穿强度主要是反映纸板抗动态冲击的能力，主要依据与瓦楞纸板的耐破强度之间的关系换算得出。
        </div>
        <div>计算公式：PET=0.0054×纸板耐破强度+2.1635</div>
        <div>纸箱耐破强度</div>
        <div style={{ marginBottom: 16 }}>
          <Input
            value={param}
            addonAfter="Kpa"
            defaultValue=""
            onChange={cal}
          />
        </div>
        <div>瓦楞纸版戳穿强度计算结果</div>
        纸板戳穿强度PET=
        <div>{0.0054 * param + 2.1635}J</div>
        <div>kgf·CM</div>
        <div>ft·lbt</div>
        参考： http://www.3602000.com/jisuanji/index.html
      </Card>
    </PageContainer>
  )
}

export default PunctureResistance
