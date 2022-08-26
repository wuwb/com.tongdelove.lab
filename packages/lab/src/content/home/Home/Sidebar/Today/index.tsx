import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import SidebarBlock from '@/components/common/SidebarBlock';

function Today(props) {
    const data = [
        {
            title: '今日推荐',
            link: '/1',
            image: 'https://iph.href.lu/24x24',
        },
        {
            title: '今日推荐2',
            link: '/2',
            image: 'https://iph.href.lu/24x24',
        }
    ]
    return (
        <SidebarBlock className="mb-4" title="今日热议主题">
            {
                data.map((item, index) => {
                    return (
                        <div key={index} className="divide-y divide-slate-800">
                            <Link href={item.link}>
                                <a>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={24}
                                        height={24}
                                    />
                                    <div>{item.title}</div>
                                </a>
                            </Link>
                        </div>
                    )
                })
            }
        </SidebarBlock>
    )
}

export default Today;
