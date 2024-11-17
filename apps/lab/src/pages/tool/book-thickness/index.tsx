import { useState } from 'react';
import { NumberInput, NativeSelect, TextInput, Button } from '@mantine/core';

function BookThicknessTool() {
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [paperWeight, setPaperWeight] = useState('147');
  const [thickness, setThickness] = useState(0);

  const calculateThickness = () => {
    const calculatedThickness = numberOfPages * (parseInt(paperWeight) / 1000);
    setThickness(calculatedThickness);
  };

  const handleClick = () => {
    calculateThickness();
  };

  return (
    <div className="grow p-2.5">
      <div className="flex flex-col gap-2.5">
        <NumberInput
          label="书籍页数"
          value={numberOfPages}
          onChange={(value) => setNumberOfPages(Number(value))}
        />
        <NativeSelect
          label="纸张克重"
          value={paperWeight}
          onChange={(value) => setPaperWeight(value)}
          data={[
            {
              value: '147',
              label: '147g',
            },
            // Add more options if needed
          ]}
        />
        <Button onClick={handleClick}>计算</Button>
        <TextInput label="书籍厚度" value={thickness} disabled />
      </div>
    </div>
  );
}

export default BookThicknessTool
