import React, { useCallback } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Container } from '@/containers/Container';
import UnitConversion from '@/utils/unit';
import 'react-contexify/dist/ReactContexify.min.css';
import {
  updateDesignData,
  setMouseUp,
  selectState
} from '@/models/workSlice';
import { useAppSelector } from '@/context/hooks';

interface Props {
}

const IndexPage = (props: Props) => {
  const state = useAppSelector(selectState);

  const {
    isMouseDown,
    mouseMoveType,
    currentDesignData,
    mouseDownPosition,
    mouseDownElementStyle
  } = state;

  // 移动
  const transform = useCallback((e) => {
    const style = { ...mouseDownElementStyle };
    const offsetX = UnitConversion.pxConversionMm(e.clientX - mouseDownPosition.x);
    const offsetY = UnitConversion.pxConversionMm(e.clientY - mouseDownPosition.y);
    switch (mouseMoveType) {
      case 'move':
        // 元素当前位置 + 偏移量
        style.top += offsetY;
        style.left += offsetX;
        // 限制必须在这个范围内移动 画板的高度-元素的高度
        // style.top = Math.max(0, Math.min(top, wrapStyle.height - style.height));
        // style.left = Math.max(0, Math.min(left, wrapStyle.width - style.width));
        break;
      case 'e':
        // 向右拖拽添加宽度
        style.width += offsetX;
        break
      // 西，增加宽度、位置同步左移
      case 'w':
        style.width -= offsetX;
        style.left += offsetX;
        break
      // 南
      case 's':
        style.height += offsetY;
        break
      // 北
      case 'n':
        style.height -= offsetY;
        style.top += offsetY;
        break
      // 东北
      case 'ne':
        style.height -= offsetY;
        style.top += offsetY;
        style.width += offsetX;
        break
      // 西北
      case 'nw':
        style.height -= offsetY;
        style.top += offsetY;
        style.width -= offsetX;
        style.left += offsetX;
        break
      // 东南
      case 'se':
        style.height += offsetY;
        style.width += offsetX;
        break
      // 西南
      case 'sw':
        style.height += offsetY;
        style.width -= offsetX;
        style.left += offsetX;
        break;
      // 拖拽移动
      case 'rotate':
        // 先计算下元素的中心点, x，y 作为坐标原点
        const x = style.width / 2 + style.left;
        const y = style.height / 2 + style.top;
        // 当前的鼠标坐标
        const x1 = e.clientX;
        const y1 = e.clientY;
        // 运用高中的三角函数
        style.transform = `rotate(${(Math.atan2((y1 - y), (x1 - x))) * (180 / Math.PI) - 90}deg)`;
        break
      default:
        break;
    }
    return style;
  }, [
    mouseDownElementStyle,
    mouseDownPosition,
    mouseMoveType,
  ]);

  // 鼠标按下移动
  const handleMouseMove = useCallback((e) => {
    if (!isMouseDown) {
      return;
    }
    if (mouseMoveType !== '') {
      const newStyle = transform(e);
      updateDesignData({
        ...currentDesignData,
        style: {
          ...currentDesignData.style,
          top: newStyle.top,
          left: newStyle.left,
          width: newStyle.width,
          height: newStyle.height,
        },
      });
    } else {
      // 拖动选框样式，宽高
    }
  }, [
    currentDesignData,
    isMouseDown,
    mouseMoveType,
    transform,
  ],
  );

  // 鼠标抬起
  const handleMouseUp = useCallback((e) => {
    setMouseUp();
    // 取消选框
  }, [
  ]);

  return (
    <div
      className="h-full w-full"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <DndProvider backend={HTML5Backend}>
        <Container {...props} />
      </DndProvider>
    </div>
  );
}

export default IndexPage;
