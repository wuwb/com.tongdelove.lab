import { Bullet } from '@antv/g2plot';
import { useEffect } from 'react';

function JianLaJi() {
  useEffect(() => {
    const data = [
      {
        title: '上证指数 000001',
        ranges: [0, 1000, 2000, 2000, 1000],
        measures: [2800, 440],
        support: [2600],
        target: [3400, 3500, 3600],
      },
      {
        title: '沪深300 000300',
        ranges: [0, 6000],
        measures: [3500, 440],
        support: [3800],
        target: [3975, 4200],
      },
    ].reverse();

    const bulletPlot = new Bullet('container2', {
      // 图表容器
      autoFit: true,
      padding: 'auto',
      limitInPlot: false,

      // renderer: 'canvas', // svg

      // 数据映射
      data: data,

      // meta
      measureField: 'measures', // 数据条的长度，实际数值的设置字段，表示实际数值。
      rangeField: 'ranges', // 背景色条的长度的设置字段，表示区间范围。
      targetField: ['support', 'target'], // 测量标记的刻度轴位置的设置字段，表示目标值。

      xField: 'title', // 用于区分不同的类型，适用于分组子弹图
      // color: {
      //     range: ['#999', '#666', '#f0efff'],
      //     measure: [],
      //     support: ['green'],
      //     target: ['#000', '#444', '#555']
      // },
      size: {
        range: 30,
        measure: 20,
        support: 25,
        target: 20,
      },
      yAxis: false,
    });

    bulletPlot.render();
  });

  return (
    <div>
      <div id="container"></div>
      <div id="container2"></div>
    </div>
  );
}

export default JianLaJi;
