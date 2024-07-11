import React from 'react';
import Image from 'next/image';
import { Row, Col } from 'antd';
import { getChildrenToRender } from '@/utils/utils';

class Content3 extends React.PureComponent<any, any> {
  getDelay = (e, b) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100;

  render() {
    const { ...props }: any = this.props;
    const { dataSource, isMobile } = props;
    delete props.dataSource;
    delete props.isMobile;
    let clearFloatNum = 0;
    const children = dataSource.block.children.map((item, i) => {
      const childObj = item.children;
      const delay = isMobile ? i * 50 : this.getDelay(i, 24 / item.md);
      const liAnim = {
        opacity: 0,
        type: 'from',
        ease: 'easeOutQuad',
        delay,
      };
      const childrenAnim = { ...liAnim, x: '+=10', delay: delay + 100 };
      clearFloatNum += item.md;
      clearFloatNum = clearFloatNum > 24 ? 0 : clearFloatNum;
      return (
        <div
          component={Col}
          animation={liAnim}
          key={item.name}
          {...item}
          componentProps={{ md: item.md, xs: item.xs }}
          className={
            !clearFloatNum
              ? `${item.className || ''} clear-both`.trim()
              : item.className
          }
        >
          <div
            animation={{
              x: '-=10',
              opacity: 0,
              type: 'from',
              ease: 'easeOutQuad',
            }}
            key="img"
            {...childObj.icon}
          >
            <Image src={childObj.icon.children} width="100%" alt="img" />
          </div>
          <div {...childObj.textWrapper}>
            <div
              key="h2"
              animation={childrenAnim}
              component="h2"
              {...childObj.title}
            >
              {childObj.title.children}
            </div>
            <div
              key="p"
              animation={{ ...childrenAnim, delay: delay + 200 }}
              component="div"
              {...childObj.content}
            >
              {childObj.content.children}
            </div>
          </div>
        </div>
      );
    });
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map(getChildrenToRender)}
          </div>
          <div {...dataSource.div}>
            <div key="u">
              <Row key="row" {...dataSource.block}>
                {children}
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content3;
