import React, { useState } from 'react'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { HStack } from '@chakra-ui/react'

const QuantitySelector = (props) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  return (
    <div>
      <div>Minimum quantity</div>
      <div>
        <RadioGroup onChange={onChange} value={value} defaultValue="1">
          <HStack gap="6">
            <Radio value="1">Any</Radio>
            <Radio value="2">500 units or less</Radio>
            <Radio value="3">1,000 units or less</Radio>
            <Radio value="4">10,000 units or less</Radio>
          </HStack>
        </RadioGroup>
      </div>
    </div>
  )
}

export default QuantitySelector
