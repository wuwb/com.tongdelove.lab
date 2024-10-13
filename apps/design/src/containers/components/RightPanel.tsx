import clsx from 'clsx'
import { memo } from 'react'
import styles from '../Container.module.css'

interface RightPanelProps {
  designData: any[]
  currentDesignData: any
  rightCollapsed: boolean
  changeRightCollapsed: (collapsed: boolean, e: Event) => void
}

export const RightPanel = memo(
  ({
    designData,
    currentDesignData,
    rightCollapsed,
    changeRightCollapsed,
  }: RightPanelProps) => {
    return (
      <div
        className={styles.attrSetting}
        style={{
          transition: 'all ease-in-out 0.5s',
          transform: rightCollapsed ? 'translate(100%,0)' : 'translate(0,0)',
        }}
      >
        {designData.length && currentDesignData ? (
          <>
            <div className={styles.tit}>属性设置</div>
            {/* <FormRender
          config={curPoint.item.editableEl}
          uid={curPoint.id}
          defaultValue={curPoint.item.config}
          onSave={handleFormSave}
          onDel={handleDel}
          rightPannelRef={ref}
        /> */}
          </>
        ) : (
          <div>还没有数据哦</div>
        )}
        {/* 右边收缩按钮 */}
        <div
          className={clsx(styles.btnDrawRight, {
            [styles.btnDrawRightHide]: !rightCollapsed,
          })}
          onClick={(e) => changeRightCollapsed(!rightCollapsed, e)}
        >
          {/* <BtnDrawRight /> */}
        </div>
      </div>
    )
  }
)

RightPanel.displayName = 'RightPanel'
