import React, { CSSProperties, PropsWithChildren, useEffect, useRef, useState } from 'react';

export function Sticky(props: PropsWithChildren<{}>) {
  const [offset, setOffset] = useState<number | undefined>(undefined);
  const [style, setStyle] = useState<CSSProperties>({});
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      if (!offset) {
        const boundingRect = elementRef.current.getBoundingClientRect();
        setOffset(boundingRect.y);
      }
    }
  });

  useEffect(() => {
    if (offset) {
      setStyle({ position: 'fixed', top: offset, zIndex: 99 });
    }
  }, [offset]);

  return (
    <div ref={elementRef} style={style}>
      {props.children}
    </div>
  );
}
