import { useState, useEffect } from 'react';

export function useScreenWidth(): number {
    const [screenWidth, setScreenWidth] = useState<number>(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);

            // Cleanup the event listener when the component unmounts or when SSR happens.
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return screenWidth;
}
