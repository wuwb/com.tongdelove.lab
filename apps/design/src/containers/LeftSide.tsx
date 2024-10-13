import { addFontDesignData } from '@/models/workSlice'
import { Tabs } from 'antd'
import clsx from 'clsx'
import { useMemo } from 'react'
import { BackgroundPanel } from '../components/Panel/BackgroundPanel'
import { FontPanel } from '../components/Panel/FontPanel'
import MaterialPanel from '../components/Panel/MaterialPanel'
import styles from './LeftSide.module.css'

interface LeftSideProps {
  collapsed: boolean
  tabIndex: string
  showTab: boolean
  handleChange: (newValue: string) => void
}

export const LeftSide = (props: LeftSideProps) => {
  const { collapsed, tabIndex, handleChange, showTab } = props

  const handleTabsChange = (key: string) => {
    console.log(key)
    handleChange(key)
  }

  // 颜色选择器
  const handleColorPicker = useMemo(() => {
    return () => {}
  }, [])

  // 文字选择器
  const handleTexturePicker = useMemo(() => {
    return () => {}
  }, [])

  // 添加文字
  const handleFontPicker = useMemo(() => {
    return (type: string) => {
      addFontDesignData('text')
    }
  }, [])

  return (
    <div
      className={clsx(
        styles.leftSideWrap,
        styles.leftSide,
        {
          [styles.leftSideCollapsed]: collapsed,
        },
        'flex w-full'
      )}
    >
      <Tabs
        className="flex"
        onChange={handleTabsChange}
        tabPosition="left"
        defaultActiveKey="类型"
        size="small"
        activeKey={tabIndex}
        items={[
          {
            label: '类型',
            key: '类型',
            children: <div>类型</div>,
          },
          {
            label: '盒型',
            key: '盒型',
            children: <MaterialPanel />,
          },
          {
            label: '模板',
            key: '模板',
            children: <div>模板</div>,
          },
          {
            label: '素材',
            key: '素材',
            children: (
              <BackgroundPanel
                handleColorPicker={handleColorPicker}
                handleTexturePicker={handleTexturePicker}
              />
            ),
          },
          {
            label: '文字',
            key: '文字',
            children: <FontPanel handleFontPicker={handleFontPicker} />,
          },
          {
            label: '图片',
            key: '图片',
            children: <div>图片</div>,
          },
          {
            label: '工具',
            key: '工具',
            children: (
              <div>
                <div>工具</div>
                <div>条形码</div>
                <div>二维码</div>
                <div>表格</div>
                <div>图表</div>
                <div>图例</div>
              </div>
            ),
          },
          {
            label: '上传',
            key: '上传',
            children: <div>上传</div>,
          },
          {
            label: '图层',
            key: '图层',
            children: <div>图层</div>,
          },
        ]}
      >
        {/* 收缩按钮 */}
        {/* <BtnDrawLeft
          className={styles.btnDrawLeft}
          onClick={(e) => changeCollapse(!collapsed, e)}
        /> */}
      </Tabs>
    </div>
  )
}
