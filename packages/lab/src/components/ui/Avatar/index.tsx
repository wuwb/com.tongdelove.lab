import { FC } from 'react';
import cx from 'clsx';

export const Avatar: FC = (props) => {
    return (
        <div className="avatar avatar-2xs">
            {props.children}
        </div>
    )
}
