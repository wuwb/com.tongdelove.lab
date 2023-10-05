import React from 'react';
import cx from 'classnames';

import { ICompBaseProps } from '@/interfaces';

interface IProps extends ICompBaseProps {
    icon: any;
}

export const HugeIcon: React.FC<IProps> = (props) => {
    return (
        <div
            className=""
            style={props.style}
        >
            {props.icon}
        </div>
    );
};
