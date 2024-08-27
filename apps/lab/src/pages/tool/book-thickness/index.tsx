import { NumberInput, NativeSelect, TextInput } from '@mantine/core';

function CommonPlatemakingSize() {
  return (
    <div>
      <div>
        <NumberInput
          label="书籍页数"
        />
        <NativeSelect
          label="纸张克重"
          data={[
            {
              value: 'time',
              label: '147g',
            },
          ]}
        />
        <TextInput
          label="书籍厚度"
          disabled
        />
      </div>
    </div>
  )
}

export default CommonPlatemakingSize
