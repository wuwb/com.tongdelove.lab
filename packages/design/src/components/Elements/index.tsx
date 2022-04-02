import React, { useRef, useCallback, useEffect, useState, useMemo } from 'react';
import classnames from 'classnames';
import styles from './index.module.css';

interface Props {
  item: any[];
}

const Elements = (props: any) => {
  const { item, dispatch, designModal, scaleNum } = props;
  const { currentDesignData, isMouseDown, mouseMoveType } = designModal;
  const elementRef = useRef<HTMLInputElement>(null);

  // 东南西北， 东北、西北、东南、西南
  const points = ['e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw'];

  // 初始数据， 因为不需要重新render 所以用 useRef
  const oriPos = useRef({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    cX: 0, // 鼠标的坐标
    cY: 0,
  });


  const handleMouseDown = useCallback((dir, e) => {
    console.log('dir: ', dir);
    e.stopPropagation();

    dispatch({
      type: 'design/setMouseMoveType',
      payload: dir
    });
    dispatch({
      type: 'design/setMouseDown',
    });
    dispatch({
      type: 'design/setMouseDownElementStyle',
      payload: {
        ...currentDesignData.style,
      }
    });
    dispatch({
      type: 'design/setMouseDownPosition',
      payload: {
        x: e.clientX,
        y: e.clientY,
      }
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!elementRef.current.contains(e.target)) {
        dispatch({
          type: 'design/cancelSelectDesignData',
          payload: {
            uuid: item.uuid
          }
        });
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClick = (uuid, e) => {
    e.stopPropagation();
    dispatch({
      type: 'design/selectDesignData',
      payload: {
        uuid,
      }
    })
  };

  const RenderControl = (
    <>
      {/* 旋转控制 */}
      <div
        className={classnames({
          [styles.hide]: true,
        })}
        style={{
          position: 'absolute',
          cursor: 'grab',
          height: '121.874px',
          width: '121.874px',
          backgroundImage: 'url("/editor-assets/img/rotate.822daa13.svg")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'red',
          pointerEvents: 'auto',
          left: '-203.123px',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
      {/* 移动控制 */}
      {points.map((item) => (
        <div
          key={item}
          className={classnames(styles.controlPoint, styles[`point-${item}`])}
          onMouseDown={handleMouseDown.bind(this, item)}
        ></div>
      ))}
    </>
  );

  return (
    <div
      ref={elementRef}
      key={item.uuid}
      className={styles.elementsWrap}
      style={{
        left: `${item.style.left}mm`,
        top: `${item.style.top}mm`,
        width: `${item.style.width}mm`,
        height: `${item.style.height}mm`,
        transform: `rotate(${item.style.rotate}deg) scale(1, 1)`,
      }}
      onClick={handleClick.bind(this, item.uuid)}
      onMouseDown={handleMouseDown.bind(this, 'move')}
    >
      <div
        className={classnames(styles.singleControlWrap, styles.singleControl, {
          [styles.selected]: item._selected,
        })}
        style={{
          borderWidth: '6.77078px',
        }}
      >
        {/* 锁定提示 */}
        <div
          className={classnames('lock iconfont icon-suo', {
            [styles.hide]: !item.locked,
          })}
          style={{
            transform: 'translate(50%, 50%) scale(6.77078)',
          }}
        ></div>
        {/* 缩放提示 */}
        <div
          className={classnames(styles.resizeTip, {
            [styles.hide]: true,
          })}
          style={{
            transform: 'translate(-50%, -50%) scale(6.77078) rotate(-450deg)',
          }}
        >
          {item.style.width} X {item.style.height} mm
        </div>
        {/* 旋转提示 */}
        <div
          className={classnames(styles.rotateTip, {
            [styles.hide]: true,
          })}
          style={{
            transform: 'translate(-50%, -50%) scale(6.77078) rotate(-450deg)',
            borderRadius: '20.3123px',
          }}
        >
          {item.style.rotate}°
        </div>
        {item._selected ? RenderControl : null}
      </div>
      {/* 移动提示 */}
      <div
        className={classnames(styles.moveTip, {
          [styles.hide]: true,
        })}
        style={{
          transform: `scale(6.7984) rotate(${item.style.rotate}deg)`,
          borderRadius: '20.3952px',
          display: 'none',
        }}
      >
        {item.style.top} , {item.style.left} mm
      </div>
      <div
        className={styles.elementFontWrap}
        style={{
          width: `${item.style.width}mm`,
          minHeight: `${item.style.lineHeight}mm`,
          height: 'auto',
          minWidth: 'auto',
          lineHeight: `${item.style.lineHeight}mm`,
          display: 'block',
          fontSize: `${item.style.fontSize}mm`,
          fontFamily: item.style.fontFamily,
          textAlign: item.style.textAlign,
          color: item.style.color,
          fontWeight: item.style.fontWeight,
          fontStyle: item.style.fontStyle,
          outline: 'none',
          lineBreak: 'anywhere',
          overflowWrap: 'anywhere',
          wordBreak: 'break-all',
          whiteSpace: 'break-spaces',
          transform: 'scale(1)',
          transformOrigin: '0px 0px',
          writingMode: 'horizontal-tb',
          userSelect: 'none',
        }}
      >
        {item.value}
      </div>
    </div>
  );
};

export default Elements;
