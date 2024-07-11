import React from 'react';
import { Layout } from '@/components/common';

const CategorySelector = () => {
    const data = [
        {
            id: 1,
            name: 'Boxes',
            count: 1,
        },
        {
            id: 2,
            name: 'Collateral',
            count: 1,
        },{
            id: 3,
            name: 'Inner Bags',
            count: 1,
        },{
            id: 4,
            name: 'Mailers',
            count: 1,
        },{
            id: 5,
            name: 'Publications',
            count: 1,
        },{
            id: 6,
            name: 'Stickers and Labels',
            count: 1,
        },{
            id: 7,
            name: 'Tape',
            count: 1,
        },{
            id: 8,
            name: 'Tubes',
            count: 1,
        },{
            id: 9,
            name: 'Void Fill',
            count: 1,
        }
    ];

    return (
        <div>
            <div>
                Category
                <div>
                    <div>...</div>
                    <div>&gt;</div>
                </div>
            </div>
            <ul>
                {
                    data.map((item) => (
                        <li key={item.id}>
                            <a>
                                <span>{item.name}</span>
                                <span>{item.count}</span>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default CategorySelector;
