import React from 'react';
import Item from './Item';
import styles from './styles.module.scss';

function TopicList() {

    const items = [
        {
            id: 1,
            title: '1',
            image: '/images/placeholder/48x48?text=1',
            author: '1',
        },
        {
            id: 2,
            title: '2',
            image: '/images/placeholder/48x48?text=2',
            author: '2',
        },
    ];

    return (
        <div className={styles.list}>
            <div className="p-2 text-lg">TopicList</div>
            <div>
                {items.map((item, index) => (
                    <Item key={index} {...item} />
                ))}
            </div>
            <div>
                <a href="">更多新主题</a>
            </div>
        </div>
    );
}

export default TopicList;
