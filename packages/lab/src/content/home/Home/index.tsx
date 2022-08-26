import React from 'react';
import cx from 'classnames';
import { PageWrapper } from "@/components/ui/PageWrapper/PageWrapper";
import { HtmlMeta } from "@/components/common/HtmlMeta/HtmlMeta";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { pkg } from '@/configs';
import { IPageBaseProps } from "@/interfaces";
import TopicList from './TopicList';
import Sidebar from './Sidebar';
import styles from './styles.module.css';

interface IProps extends IPageBaseProps { }

export const Home: React.FC<any> = (props) => {
    return (
        <PageWrapper
            className={cx(
                styles['comp-wrapper'],
                { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
                `g-comp--${Home.displayName}`,
                props.className,
                'container'
            )}
            style={props.style}
        >
            <HtmlMeta title={pkg.name} disableSiteName />
            <div className="mt-5 clearfix">
                <div className="float-left" style={{
                    width: "calc(100% - 340px)"
                }}>
                    <TopicList />
                </div>
                <div className="float-right w-[320px]">
                    <Sidebar />
                </div>
            </div>
        </PageWrapper>
    );
}
