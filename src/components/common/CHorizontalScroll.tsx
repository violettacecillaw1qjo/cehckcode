import clsx from 'clsx';
import React, { forwardRef, MouseEventHandler, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

type CHorizontalScrollProps = {
    isGrabScroll?: boolean;
    className?: string;
    children: React.ReactNode;
    onWheel?: (e: React.WheelEvent<HTMLDivElement>) => void;
    onWrapStart?: () => void;
    onWrapEnd?: () => void;
};

const SCROLL_SPEED_FACTOR = 2;

const CHorizontalScroll = (props: CHorizontalScrollProps, ref: React.ForwardedRef<HTMLDivElement | null>) => {
    const { isGrabScroll, className, children, onWheel, onWrapStart, onWrapEnd } = props;

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useImperativeHandle(ref, () => wrapperRef.current!, [wrapperRef.current]);

    const handleWheel = useCallback(
        (e: React.WheelEvent<HTMLDivElement>) => {
            onWheel && onWheel(e);
            const currentRef = wrapperRef.current;
            if (!currentRef) return;

            currentRef.scrollLeft += e.deltaY;
        },
        [onWheel],
    );

    const handleMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
        (e) => {
            const currentRef = wrapperRef.current;

            if (!isGrabScroll || !currentRef) return;

            isDragging.current = true;
            startX.current = e.pageX - currentRef.offsetLeft;
            scrollLeft.current = currentRef.scrollLeft;
        },
        [isGrabScroll],
    );

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            const currentRef = wrapperRef.current;

            if (!isDragging.current || !currentRef || !isGrabScroll) return;

            e.preventDefault();

            const x = e.pageX - currentRef.offsetLeft;
            const walk = (x - startX.current) * SCROLL_SPEED_FACTOR;
            currentRef.scrollLeft = scrollLeft.current - walk;
            onWrapStart && onWrapStart();
        },
        [isGrabScroll, onWrapStart],
    );

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
        onWrapEnd && onWrapEnd();
    }, [isGrabScroll, onWrapEnd]);

    useEffect(() => {
        if (!isGrabScroll) return;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [
        isGrabScroll,
        onWrapStart,
        onWrapEnd,
    ]);

    return (
        <div
            ref={wrapperRef}
            className={clsx(
                'transition-all duration-300',
                {
                    'cursor-grab': isGrabScroll,
                },
                className,
            )}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {children}
        </div>
    );
};

export default forwardRef(CHorizontalScroll);
