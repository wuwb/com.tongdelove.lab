import React from 'react';
import { Radio } from 'antd';
import { Layout } from '@/components/common';

const QuantitySelector = (props) => {
    const [value, setValue] = React.useState(1);

    const onChange = e => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };

    return (
        <div>
            <div>Minimum quantity</div>
            <div>
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Any</Radio>
                    <Radio value={2}>500 units or less</Radio>
                    <Radio value={3}>1,000 units or less</Radio>
                    <Radio value={4}>10,000 units or less</Radio>
                </Radio.Group>
            </div>
        </div>
    )
}

export default QuantitySelector;
