import React, { useState } from 'react';
import Link from 'next/link';
import { Collapse } from 'antd';
import cx from 'classnames';
import { MenuOutlined } from '@ant-design/icons';
import s from './TopMenuDocker.module.css';

const { Panel } = Collapse;

const TopMenuDocker = (props) => {
  const [showContent, setShowContent] = useState(false);

  function handleClick() {
    setShowContent(!showContent);
  }

  return (
    <div className={s.topMenuDocker}>
      <div className="flex" tabIndex={0} aria-label="Menu" onClick={handleClick}>
        <MenuOutlined />
      </div>
      {
         <div className={cx(s.topMenuDockerContent, {
           block: showContent,
           hidden: !showContent,
         })}>
          <Collapse
            defaultActiveKey={['1']}
            ghost
            expandIconPosition="right"
          >
            <Panel header="产品" key="1">
              <ul>
                <li>
                  <Link href="/products/folding-carton">
                    <a>折叠纸盒</a>
                  </Link>
                </li>
                <li>
                  <Link href="/products/accessories">
                    <a>包装附件</a>
                  </Link>
                </li>
              </ul>
            </Panel>
            <Panel header="解决方案" key="2">
              <ul>
                <li>
                  <Link href="/solutions/baked-fish">
                    <a>烤鱼自热包装</a>
                  </Link>
                </li>
              </ul>
            </Panel>
          </Collapse>
          <div>
            <Link href="/about">
              <a className="text-sm block px-4 py-3">关于</a>
            </Link>
          </div>
        </div>
      }

    </div>
  );
}

export default TopMenuDocker;
