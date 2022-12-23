import cx from 'clsx';
import React from 'react';
import { ICompBaseProps } from '@/interfaces';
import styles from './styles.module.scss';

interface IProps extends ICompBaseProps {
    children: React.ReactNode;
}

export const PageWrapper: React.FC<IProps> = (props) => {
    return (
        <div
            className={cx(
                styles['page-wrapper'],
                props.className,
            )}
            style={props.style}
        >
            {props.children}
        </div>
    );
};
