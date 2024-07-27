import React from 'react'
import { SidebarBlock } from '@/components/common/SidebarBlock'

export function Status() {
  return (
    <SidebarBlock className="mb-4" title="社区运行状况">
      <ul>
        <li>
          注册会员 <span>100</span>
        </li>
        <li>
          主题 <span>100</span>
        </li>
        <li>
          回复 <span>200</span>
        </li>
      </ul>
      <ul>
        <li>
          在线人数 <span>100</span>人
        </li>
        <li>
          服务运行 <span>100</span>天
        </li>
      </ul>
    </SidebarBlock>
  )
}
