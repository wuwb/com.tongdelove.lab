import cx from 'clsx';
import React from 'react';
// import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IPageBaseProps } from '@/interfaces';
import { useDarkMode } from '@/hooks';
import { HtmlMeta, HugeIcon, PageWrapper } from '@/components';

import styles from './styles.module.css';

interface IProps extends IPageBaseProps { }

export const AboutName: React.FC<IProps> = (props) => {
    useDarkMode();

    const { name } = useRouter()?.query;

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
            <HtmlMeta title={`${name}`} />

            <HugeIcon icon={<DarkModeIcon />} className={styles['huge-icon']} />

            <div className={styles['params-info']}>
                <code>{name}</code>
            </div>
        </PageWrapper>
    );
};
