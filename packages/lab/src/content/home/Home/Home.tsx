import React from 'react';
import cx from 'classnames';
import { PageWrapper } from "@/components/ui/PageWrapper/PageWrapper";
import { HtmlMeta } from "@/components/common/HtmlMeta/HtmlMeta";
import { HugeIcon } from '@/components/common';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { pkg } from '@/configs';
import { IPageBaseProps } from "@/interfaces";

import styles from './style.module.css';

interface IProps extends IPageBaseProps { }

export const Home: React.FC<any> = (props) => {
    return (
        <PageWrapper
            className={cx(
                styles['comp-wrapper'],
                { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
                `g-comp--${Home.displayName}`,
                props.className,
            )}
            style={props.style}
        >
            <HtmlMeta title={pkg.name} disableSiteName />
            <HugeIcon icon={<KeyboardArrowDownIcon />} />
        </PageWrapper>
    );
}
