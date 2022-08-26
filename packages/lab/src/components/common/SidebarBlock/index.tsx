import React from 'react';
import cn from 'classnames';

function SidebarBlock(props) {
    return (
        <div className={cn('bg-white', props.className)}>
            <div className="p-4 text-gray-500 border-b border-b-solid border-b-slate-900">{props.title}</div>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default SidebarBlock;
