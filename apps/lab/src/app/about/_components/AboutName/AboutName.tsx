import cx from 'clsx';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { IconMoon } from '@tabler/icons-react';
import { useDarkMode } from '@/hooks';
import { HugeIcon, PageWrapper } from '@/components';

import styles from './styles.module.scss';
import type { AnyAaaaRecord } from 'dns';


export const AboutName: React.FC<AnyAaaaRecord> = (props) => {
    useDarkMode();
    const searchParams = useSearchParams()
    const name = searchParams.get('name')

    return (
        <PageWrapper
            className={cx(
                styles['comp-wrapper'],
                { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
                `g-comp--${AboutName.displayName}`,
                props.className,
            )}
            style={props.style}
        >

            <HugeIcon icon={<IconMoon />} className={styles['huge-icon']} />

            <div className={styles['params-info']}>
                <code>{name}</code>
            </div>
        </PageWrapper>
    );
};

export default {}
