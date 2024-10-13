import { useMemo } from 'react';
import clsx from 'clsx';
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
import { Tabs, rem } from '@mantine/core';

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
    }, 'flex w-full')}>
      <Tabs
        className="w-[303px] flex"
        orientation="vertical"
        onChange={handleTabsChange}
        defaultValue="类型"
      >
        <Tabs.List className={styles.tabWrap}>
          <Tabs.Tab value="类型"
            className={styles.tabItem} {...a11yProps(0)}>类型</Tabs.Tab>
          <Tabs.Tab value="盒型" className={styles.tabItem} {...a11yProps(1)}>盒型</Tabs.Tab>
          <Tabs.Tab value="模板" className={styles.tabItem} {...a11yProps(2)}>模板</Tabs.Tab>
          <Tabs.Tab value="素材" className={styles.tabItem} {...a11yProps(3)}>素材</Tabs.Tab>
          <Tabs.Tab value="文字" className={styles.tabItem} {...a11yProps(4)}>文字</Tabs.Tab>
          <Tabs.Tab value="图片" className={styles.tabItem} {...a11yProps(5)}>图片</Tabs.Tab>
          <Tabs.Tab value="工具" className={styles.tabItem} {...a11yProps(6)}>工具</Tabs.Tab>
          <Tabs.Tab value="上传" className={styles.tabItem} {...a11yProps(7)}>上传</Tabs.Tab>
          <Tabs.Tab value="图层" className={styles.tabItem} {...a11yProps(8)}>图层</Tabs.Tab>
        </Tabs.List>
        <div className={clsx(styles.panelwrap, {
          hidden: showTab,
        })}>
          <PanelItemWrap value="类型">
            类型
          </PanelItemWrap>
          <PanelItemWrap value="盒型">
            <MaterialPanel />
          </PanelItemWrap>
          <PanelItemWrap value="文字">
            <FontPanel handleFontPicker={handleFontPicker} />
          </PanelItemWrap>
          <PanelItemWrap value="素材">
            <BackgroundPanel
              handleColorPicker={handleColorPicker}
              handleTexturePicker={handleTexturePicker}
            />
          </PanelItemWrap>
          <PanelItemWrap value="图片">
            <div className={styles.ctitle}>图片</div>
          </PanelItemWrap>
          <PanelItemWrap value="工具">
            <div className={styles.ctitle}>工具</div>
            <div>条形码</div>
            <div>二维码</div>
            <div>表格</div>
            <div>图表</div>
            <div>图例</div>
          </PanelItemWrap>
          <PanelItemWrap value="上传">
            <div className={styles.ctitle}>上传</div>
          </PanelItemWrap>
          <PanelItemWrap value="图层">
            <div className={styles.ctitle}>图层</div>
          </PanelItemWrap>
        </div>
        {/* 收缩按钮 */}
        {/* <BtnDrawLeft
          className={styles.btnDrawLeft}
          onClick={(e) => changeCollapse(!collapsed, e)}
        /> */}
      </Tabs>
    </div>
  );
}

export default LeftSide;
