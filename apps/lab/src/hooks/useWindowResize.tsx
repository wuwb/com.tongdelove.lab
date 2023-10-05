import { useState, useEffect, useCallback } from 'react';

// 兼容服务端渲染
export const useWindowSize = (): { width?: number; height?: number } => {
    const isClient = typeof window === 'object';

    const getSize = useCallback(() => {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined,
        };
    }, [isClient]);

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return;
        }
        function handleResize(): void {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);

        return (): void => window.removeEventListener('resize', handleResize);
    }, [getSize, isClient]);

    return windowSize;
};
