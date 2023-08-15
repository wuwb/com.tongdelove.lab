import React, { createContext, useCallback, useContext, useEffect } from 'react';
import AccordionStyles from './Accordion.module.css';

function Accordion({
    children,
    className,
    defaultActiveId = [],
    icon,
    iconPosition = 'right',
    bordered,
    onChange,
}) {

    return (
        <div></div>
    );
}

export function Item({ children, className, label, id }) {
    // 
}

Accordion.Item = Item;
export default Accordion;
