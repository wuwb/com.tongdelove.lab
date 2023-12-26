"use client"

import { Link } from "@/components/ui";
import cx from 'clsx';
import { useEffect, useRef, useState } from "react";
import { DropdownMenu } from './DropdownMenu';
import styles from './MenuItems.module.scss';

export function MenuItems({ items, depthLevel }) {
    const [dropdown, setDropdown] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, []);

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };

    return (
        <div className={styles['menu-items']}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            ref={ref}>
            {items.url ? (
                <Link
                    href={items.url}
                    onClick={() => setDropdown((prev) => !prev)}
                    aria-expanded={dropdown ? "true" : "false"}
                >
                    <div className={styles['menu-items-link']}>
                        {items.icon ? <div className="">icon</div> : null}
                        {items.description ? (
                            <div className={cx({
                                'ml-3': items.icon,
                            })}>
                                <>
                                    <div className="font-semibold text-base">{items.title}</div>
                                    <div className="font-normal text-xs">{items.description}</div>
                                </>
                            </div>
                        ) : (
                            <div className="font-normal text-base">{items.title}</div>
                        )}
                        {items.submenu ?
                            (depthLevel > 0 ? <span>&raquo;</span> : <span className={styles['arrow']} />) : null
                        }
                    </div>
                </Link>
            ) : (
                <Link
                    href={'/#'}
                    onClick={() => setDropdown((prev) => !prev)}
                    aria-expanded={dropdown ? "true" : "false"}
                >
                    <div className={styles['menu-items-link']}>
                        {items.icon ? <div className="">icon</div> : null}
                        {items.description ? (
                            <div className={cx({
                                'ml-3': items.icon,
                            })}>
                                <>
                                    <div className="font-semibold text-base">{items.title}</div>
                                    <div className="font-normal text-xs">{items.description}</div>
                                </>
                            </div>
                        ) : (
                            <div className="font-normal text-base">{items.title}</div>
                        )}
                        {items.submenu ?
                            (depthLevel > 0 ? <span>&raquo;</span> : <span className={styles['arrow']} />) : null
                        }
                    </div>
                </Link>
            )}

            {items.submenu ? (
                <DropdownMenu dropdown={dropdown} submenus={items.submenu} depthLevel={depthLevel} />
            ) : null}
        </div>
    );
}
