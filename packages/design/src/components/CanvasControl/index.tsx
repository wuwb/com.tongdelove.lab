import React, { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import { Popover } from 'antd';
import { InsertRowBelowOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import classnames from 'classnames';
import styles from './index.module.css';
import FastMenu from '../FastMenu';
import styled from '@emotion/styled';
import ZoomMenu from './ZoomMenu';

interface CanvasControlProps {
  scaleNum: number;
  handleSlider: Function;
  backSize: (event: MouseEvent<HTMLDivElement>) => unknown;
  handleRotate: MouseEventHandler;
}

const StyledCanvasControl = styled.div`
  display: inline-block;
  left: 0;
  bottom: 0;
  background: #ffffff;
  border-radius: 4px;
  pointer-events: auto;
`;

const CanvasControl = (props: CanvasControlProps) => {
  const { scaleNum, handleSlider, backSize, handleRotate } = props;

  const handleZoom = (zoom: number) => { };

  const zoomMenu = (
    <div className={styles.zoomMenu}>
      <div className={styles.zoomMenuItem}>20%</div>
      <div className={styles.zoomMenuItem}>50%</div>
      <div className={styles.zoomMenuItem}>100%</div>
      <div className={styles.zoomMenuItem}>200%</div>
      <div className={styles.zoomMenuItem}>300%</div>
      <div className={styles.zoomMenuItem}>适应屏幕</div>
      <div className={styles.zoomMenuItem} onClick={backSize}>实际大小</div>
    </div>
  );

  return (
    <Draggable>
      <StyledCanvasControl className="absolute">

        {/* 放大缩小功能 */}
        <Popover placement="bottom" title={null} content={zoomMenu} trigger="hover">
          <span
            className={classnames(styles.sliderBtn, {
              [styles.sliderBtnDisabled]: scaleNum === 3
            })}
            onClick={handleSlider.bind(this, 1)}
          >+</span>
          <span>{Math.floor(scaleNum * 10) * 10}%</span>
          <span
            className={classnames(styles.sliderBtn, {
              [styles.sliderBtnDisabled]: scaleNum === 0.2
            })}
            onClick={handleSlider.bind(this, 0)}
          >-</span>
        </Popover>

        <Popover className={styles.backSize} placement="bottom" title={null} content="旋转画布" trigger="hover">
          <span className={styles.rotateCanvas} onClick={handleRotate}>
            旋转
          </span>
        </Popover>
      </StyledCanvasControl>
    </Draggable>
  );
};

export default CanvasControl;
