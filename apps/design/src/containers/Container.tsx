import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import clsx from "clsx";
import { ActionCreators } from "redux-undo";
import HeaderComponent from "../components/Header";
import CanvasControl from "../components/CanvasControl";
import RightButtons from "../components/RightButtons";
import TargetBox from "./TargetBox";
import {
  toggleFlip,
  selectState
} from '@/models/workSlice';
import { useAppSelector } from '@/context/hooks';
import { throttle } from "@/utils/tool";
import LeftSide from './LeftSide';
import styles from './Container.module.css';

interface ContainerProps {
  history?: any;
  location?: any;
  dispatch?: any;
  designModal: any;
}

const Container = (props: ContainerProps) => {
  const { dispatch, designModal } = props;
  const state = useAppSelector(selectState);
  const {
    isMouseDown,
    mouseMoveType,
    mouseDownPosition,
    mouseDownElementStyle,
    designData,
    currentDesignData,
    insideDesignData,
    currentInsideDesignData,
  } = state;

  const containerRef = useRef<HTMLDivElement>(null);

  const [scaleNum, setScale] = useState(1);
  const [rotateNum, setRotate] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(true);
  const [dragstate, setDragState] = useState({ x: 0, y: 0 });
  const [diffMove, setDiffMove] = useState({
    start: { x: 0, y: 0 },
    move: false,
  });
  const [tabIndex, setTabIndex] = useState(0);
  const [showTab, setShowTab] = useState(false);

  // 左边收起
  const changeCollapse = useMemo(() => {
    return (c: boolean) => {
      setCollapsed(c);
    };
  }, []);

  // 右边收起
  const changeRightCollapsed = useMemo(() => {
    return (c: boolean, e: Event) => {
      e.stopPropagation();
      setRightCollapsed(c);
    };
  }, []);

  // 设置实际大小
  const backSize = () => {
    setScale(1);
    setDragState({ x: 0, y: 0 });
  };

  // 缩放
  const handleSlider = useMemo(() => {
    return (type: any) => {
      if (type) {
        setScale((prev: number) => +(prev + 0.1).toFixed(1));
      } else {
        setScale((prev: number) => +(prev - 0.1).toFixed(1));
      }
    };
  }, []);

  // 旋转
  const handleRotate = useMemo(() => {
    return () => {
      setRotate((prevValue: number) => {
        let newValue = prevValue + 90;
        if (newValue === 360) {
          newValue = 0;
        }
        return newValue;
      });
    };
  }, []);

  // 保存
  const handleFormSave = useMemo(() => {
    return (data: any) => {
      // modPointData({
      //   ...currentDesignData,
      //   item: {
      //     ...currentDesignData.item,
      //     config: data,
      //   },
      // });
    };
  }, [currentDesignData]);

  // 清除
  const clearData = useCallback(() => {
    // clearAll();
  }, []);

  // 删除
  const handleDel = useMemo(() => {
    return (id: any) => {
      // delPointData({ id });
    };
  }, []);

  // 重做
  const redoHandler = useMemo(() => {
    return () => {
      dispatch(ActionCreators.redo());
    };
  }, [dispatch]);

  // 撤销
  const undoHandler = useMemo(() => {
    return () => {
      dispatch(ActionCreators.undo());
    };
  }, [dispatch]);

  // 设置翻转
  const handleToggleInSideAndOutSide = useMemo(() => {
    return (type: boolean) => {
      toggleFlip(type);
    };
  }, []);

  // 设置移动状态
  useEffect(() => {
    if (diffMove.move && containerRef.current) {
      containerRef.current.style.cursor = "move";
    } else {
      containerRef.current!.style.cursor = "default";
    }
  }, [diffMove.move]);

  // 移动开始
  const mousedownFn = useMemo(() => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === containerRef.current) {
        setDiffMove({
          start: {
            x: e.clientX,
            y: e.clientY,
          },
          move: true,
        });
      }
    };
  }, []);

  // 移动中
  const mousemoveFn = useMemo(() => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (diffMove.move) {
        console.log("移动");
        const newX = e.clientX;
        const newY = e.clientY;
        const diffx = newX - diffMove.start.x;
        const diffy = newY - diffMove.start.y;
        setDiffMove({
          start: {
            x: newX,
            y: newY,
          },
          move: true,
        });
        setDragState((prev) => {
          return {
            x: prev.x + diffx,
            y: prev.y + diffy,
          };
        });
      }
    };
  }, [diffMove.move, diffMove.start.x, diffMove.start.y]);

  // 移动结束
  const mouseupFn = useMemo(() => {
    return () => {
      setDiffMove({
        start: { x: 0, y: 0 },
        move: false,
      });
    };
  }, []);

  // 滚轮
  const onwheelFn = useMemo(() => {
    return (e: React.WheelEvent<HTMLDivElement>) => {
      if (e.deltaY < 0) {
        setDragState((prev) => ({
          x: prev.x,
          y: prev.y + 40,
        }));
      } else {
        setDragState((prev) => ({
          x: prev.x,
          y: prev.y - 40,
        }));
      }
    };
  }, []);


  // 渲染右边
  const renderRight = useMemo(() => {
    return (
      <div
        className={styles.attrSetting}
        style={{
          transition: "all ease-in-out 0.5s",
          transform: rightCollapsed ? "translate(100%,0)" : "translate(0,0)",
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
    );
  }, [
    designData.length,
    insideDesignData.length,
    currentDesignData,
    currentInsideDesignData,
    handleDel,
    handleFormSave,
    changeRightCollapsed,
    rightCollapsed,
  ]);

  const handleTabChange = (newTabIndex: number) => {
    if (tabIndex !== newTabIndex) {
      setTabIndex(newTabIndex);
    } else {
      setShowTab(!showTab);
    }
  }

  return (
    <>
      <HeaderComponent
        redoHandler={redoHandler}
        undoHandler={undoHandler}
        designData={designData}
        clearData={clearData}
      />

      <LeftSide
        showTab={showTab}
        tabIndex={tabIndex}
        collapsed={collapsed}
        handleChange={handleTabChange}
      />

      {/* 中间 */}
      <section
        id="calibration"
        className={clsx(styles.editorCenter, {
          [styles.leftIndent]: !collapsed,
          [styles.rightIndent]: !rightCollapsed,
        })}
        ref={containerRef}
        onMouseDown={mousedownFn}
        onMouseMove={throttle(mousemoveFn, 500)}
        onMouseUp={mouseupFn}
        onMouseLeave={mouseupFn}
        onWheel={onwheelFn}
        tabIndex={1}
      >
        <div className={styles.tickMarkTop}>
          {/* <Calibration direction="up" id="calibrationUp" multiple={scaleNum} /> */}
        </div>
        <div className={styles.tickMarkLeft}>
          {/* <Calibration direction="right" id="calibrationRight" multiple={scaleNum} /> */}
        </div>

        <TargetBox
          dragState={dragstate}
          setDragState={setDragState}
          scaleNum={scaleNum}
          rotateNum={rotateNum}
        />
      </section>

      {/* 底部控制器 */}
      <section
        className={clsx(styles.bottomBtnWrap, {
          [styles.leftIndent]: !collapsed,
          [styles.rightIndent]: !rightCollapsed,
        })}
      >
        <CanvasControl
          scaleNum={scaleNum}
          handleSlider={handleSlider}
          handleRotate={handleRotate}
          backSize={backSize}
        />
        <RightButtons
          handleToggleInSideAndOutSide={handleToggleInSideAndOutSide}
        />
      </section>

      {/* 渲染右边 */}
      {renderRight}
    </>
  );
};

export default Container;
