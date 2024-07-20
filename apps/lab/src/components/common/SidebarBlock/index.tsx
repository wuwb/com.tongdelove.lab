import React from 'react'
import clsx from 'clsx'

function SidebarBlock(props) {
  return (
    <div className={clsx('bg-white', props.className)}>
      <div className="border-b-solid border-b border-b-slate-900 p-4 text-gray-500">
        {props.title}
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export default SidebarBlock
