import React, { memo, useCallback, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { uuid } from '@/utils/tool';
import { Menu, Item, useContextMenu } from 'react-contexify';
import clsx from 'clsx';
// import BackgroundSketetonWrap from '../assets/background-skeleton-wrap.svg';
import Elements from '../components/Elements';
import FourAngle from '../components/FourAngle';
import {
  updateDesignData,
  deleteDesignData,
  copyDesignData,
  selectState
} from '@/models/workSlice';
import { useAppSelector } from '@/context/hooks';
import styles from '../pages/design.module.css';

const TargetBox = memo((props) => {
  const state = useAppSelector(selectState);

  const {
    scaleNum,
    rotateNum,
    canvasId,
    dispatch,
    dragState,
    setDragState,
  } = props;

  const {
    designData,
    currentDesignData,
    flip,
    lineGuides,
  } = state;

  let allType: any[] = [];

  // 拖放后执行
  const [{ isOver }, drop] = useDrop({
    accept: allType,
    drop: (item: { h: number; type: string; x: number }, monitor) => {
      let parentDiv = document.getElementById(canvasId),
        pointRect = parentDiv!.getBoundingClientRect(),
        top = pointRect.top,
        pointEnd = monitor.getSourceClientOffset(),
        y = pointEnd!.y < top ? 0 : pointEnd!.y - top,
        col = 24, // 网格列数
        cellHeight = 2,
        w = item.type === 'Icon' ? 3 : col;
      // 转换成网格规则的坐标和大小
      let gridY = Math.ceil(y / cellHeight);

      dispatch({
        type: 'design/addDesignData',
        payload: {
          id: uuid(6, 10),
          item,
          point: { i: `x-${designData.length}`, x: 0, y: gridY, w, h: item.h, isBounded: true },
          status: 'inToCanvas',
        },
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
  });

  // 结束拖放
  const dragStop = useMemo(() => {
    return (layout, oldItem, newItem, placeholder, e, element) => {
      const data = designData.filter((item) => item.id === newItem.i)[0];
      updateDesignData({ ...data, point: newItem, status: 'inToCanvas' });
    };
  }, [dispatch, designData]);

  // 开始拖放
  const onDragStart = useMemo(() => {
    return (layout, oldItem, newItem, placeholder, e, element) => {
      const data = designData.filter((item) => item.id === newItem.i)[0];
      updateDesignData({ ...data, status: 'inToCanvas' });
    };
  }, [dispatch, designData]);

  // 调整结束
  const onResizeStop = useMemo(() => {
    return (layout, oldItem, newItem, placeholder, e, element) => {
      const data = designData.filter((item) => item.id === newItem.i)[0];
      updateDesignData({ ...data, point: newItem, status: 'inToCanvas' });
    };
  }, [dispatch, designData]);

  // 菜单功能
  const MENU_ID = 'canvas_menu';

  // 删除菜单
  const handleContextMenuDel = () => {
    if (currentDesignData) {
      deleteDesignData({ uuid: currentDesignData.uuid });
    }
  };

  // 复制菜单
  const handleContextMenuCopy = () => {
    if (currentDesignData) {
      copyDesignData({ uuid: currentDesignData.uuid });
    }
  };

  // 内容菜单
  const onConTextClick = (type: string) => {
    if (type === 'delete') {
      handleContextMenuDel();
    } else if (type === 'copy') {
      handleContextMenuCopy();
    }
  };

  // 菜单
  const MyAwesomeMenu = useCallback(
    () => (
      <Menu id={MENU_ID}>
        <Item onClick={() => onConTextClick('copy')}>复制</Item>
        <Item onClick={() => onConTextClick('delete')}>删除</Item>
      </Menu>
    ),
    [onConTextClick],
  );

  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function handleContextMenu(event) {
    event.preventDefault();
    show(event, {
      props: {
        key: 'value',
      },
    });
  }

  const opacity = isOver ? 0.7 : 1;

  const render = useMemo(() => {
    return (
      <Draggable
        position={dragState}
        handle=".js_box"
        onStop={(e: DraggableEvent, data: DraggableData) => {
          setDragState({ x: data.x, y: data.y });
        }}
      >
        <>
          <div
            id="svgContainer"
            className={clsx(styles.canvasBox, styles.zoomAbleCanvasWrap)}
            onContextMenu={handleContextMenu}
            style={{
              width: '572mm',
              height: '590mm',
              transform: `scale(${scaleNum}) rotate(${rotateNum}deg) translate(0px, 0px)`,
              pointerEvents: 'auto',
              clipPath: 'url("#zoomable-canvas-clip-path")',
            }}
            ref={drop}
          >
            <div className={styles.layerWrap}>
              {/* 4个定位角标 */}
              <FourAngle />

              {/* 背景图片 */}
              <div
                className={clsx(styles.backgroundWrap, {
                  [styles.flip]: flip,
                })}
              ></div>

              <div>
                {designData.map((item) => {
                  return (
                    <Elements
                      key={item.uuid}
                      item={item}
                      scaleNum={scaleNum}
                    />
                  );
                })}
              </div>

              <div className={styles.bgAndElementWrap}>

              </div>

              {/* 盒子形状 svg */}
              <div
                className={styles.backgroundSkeletonWrap}
                style={{
                  pointerEvents: 'none',
                  transform: flip ? 'scale(1, 1)' : 'scale(-1, 1)',
                }}
              >
                {/* <BackgroundSketetonWrap /> */}
              </div>

              {/* 提示信息：可拖入文字或图片开始设计，按住空格可以拖动画布 */}
            </div>
          </div>

          <div
            className={styles.mouseSelectionRange}
            style={{
              left: 0,
              top: 0,
              width: 0,
              height: 0,
              display: 'none',
            }}
          ></div>

          <div className={styles.ruleWrap}>

            <div title="清除参考线" className={styles.ruleCorner}></div>
            {
              lineGuides.map((item) => (
                <div
                  key={`${item.x}-${item.y}`}
                  className={clsx(styles.lineGuideWrap, styles[`type-${item.type}`])}
                  style={{
                    left: `${item.x}mm`,
                    top: `${item.y}mm`,
                  }}
                >
                  <span className={styles.showTip}>
                    {item.type === 'y' ? `X:${item.x}` : `Y:${item.y}`}
                  </span>
                </div>
              ))
            }
          </div>

        </>
      </Draggable>
    );
  }, [
    flip,
    handleContextMenu,
    dragState,
    drop,
    designData,
    scaleNum,
    rotateNum,
    setDragState,
  ]);

  return (
    <>
      {render}
      <MyAwesomeMenu />
    </>
  );
});

export default TargetBox;
