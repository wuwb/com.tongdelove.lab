import { useMemo } from 'react';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import clsx from "clsx";
import BackgroundPanel from "../components/Panel/BackgroundPanel";
import FontPanel from "../components/Panel/FontPanel";
import MaterialPanel from "../components/Panel/MaterialPanel";
import styles from './LeftSide.module.css';
import {
    toggleFlip,
    addFontDesignData,
    selectState
} from '@/models/workSlice';
import PanelItemWrap from './Panels/PanelItemWrap';

interface Props {
    collapsed: boolean;
    tabIndex: number;
    showTab: boolean;
    handleChange: (newValue: number) => void;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-TabPanel-${index}`,
    };
}

const LeftSide = (props: Props) => {
    const { collapsed, tabIndex, handleChange, showTab } = props;

    const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue);
        handleChange(newValue);
    };

    // 颜色选择器
    const handleColorPicker = useMemo(() => {
        return () => { };
    }, []);

    // 文字选择器
    const handleTexturePicker = useMemo(() => {
        return () => { };
    }, []);

    // 添加文字
    const handleFontPicker = useMemo(() => {
        return (type: string) => {
            addFontDesignData("text");
        };
    }, []);

    return (
        <div className={clsx(styles.leftSideWrap, styles.leftSide, {
            [styles.leftSideCollapsed]: collapsed,
        })}>
            <Tabs
                className={styles.tabWrap}
                orientation="vertical"
                variant="standard"
                value={tabIndex}
                onChange={handleTabsChange}
                aria-label="Vertical tabs"
                sx={{ borderLeft: 1 }}
            >
                <Tab label="类型" className={styles.tabItem} {...a11yProps(0)} />
                <Tab label="盒型" className={styles.tabItem} {...a11yProps(1)} />
                <Tab label="模板" className={styles.tabItem} {...a11yProps(2)} />
                <Tab label="素材" className={styles.tabItem} {...a11yProps(3)} />
                <Tab label="文字" className={styles.tabItem} {...a11yProps(4)} />
                <Tab label="图片" className={styles.tabItem} {...a11yProps(5)} />
                <Tab label="工具" className={styles.tabItem} {...a11yProps(6)} />
                <Tab label="上传" className={styles.tabItem} {...a11yProps(7)} />
                <Tab label="图层" className={styles.tabItem} {...a11yProps(8)} />
            </Tabs>
            <div className={clsx(styles.panelwrap, {
                hidden: showTab,
            })}>
                <PanelItemWrap value={tabIndex} index={0}>
                    类型
                </PanelItemWrap>
                <PanelItemWrap value={tabIndex} index={1}>
                    <MaterialPanel />
                </PanelItemWrap>
                <PanelItemWrap value={tabIndex} index={4}>
                    <FontPanel handleFontPicker={handleFontPicker} />
                </PanelItemWrap>
                <PanelItemWrap value={tabIndex} index={2}>
                    <BackgroundPanel
                        handleColorPicker={handleColorPicker}
                        handleTexturePicker={handleTexturePicker}
                    />
                </PanelItemWrap>
                <PanelItemWrap value={tabIndex} index={5}>
                    <div className={styles.ctitle}>图片</div>
                </PanelItemWrap>
                <PanelItemWrap value={tabIndex} index={6}>
                    <div className={styles.ctitle}>工具</div>
                    <div>条形码</div>
                    <div>二维码</div>
                    <div>表格</div>
                    <div>图表</div>
                    <div>图例</div>
                </PanelItemWrap>
                <PanelItemWrap value={tabIndex} index={7}>
                    <div className={styles.ctitle}>上传</div>
                </PanelItemWrap>
                <PanelItemWrap value={tabIndex} index={8}>
                    <div className={styles.ctitle}>图层</div>
                </PanelItemWrap>
            </div>
            {/* 收缩按钮 */}
            {/* <BtnDrawLeft
          className={styles.btnDrawLeft}
          onClick={(e) => changeCollapse(!collapsed, e)}
        /> */}
        </div>
    );
}

export default LeftSide;
