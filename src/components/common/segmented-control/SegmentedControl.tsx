import clsx from 'clsx';
import { useEffect, useLayoutEffect, useRef } from 'react';

import IconChevronDown from '@/assets/icons/common/ChevronDown';

import CHorizontalScroll from '../CHorizontalScroll';

import { SegmentedControlOption } from './SegmentedControl.type';

type SegmentedControlProps<T = string> = {
    options: SegmentedControlOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
};

const SegmentedControl = <T,>(props: SegmentedControlProps<T>) => {
    const { value, options, onChange } = props;

    const refScroll = useRef<HTMLDivElement>(null);

    const indicatorRef = useRef<HTMLDivElement>(null);

    const refArrow = useRef<Record<'left' | 'right', HTMLDivElement | null>>({
        left: null,
        right: null,
    });

    const tabItemRef = useRef<Record<string, HTMLDivElement>>({});

    const handleCheckOverScroll = () => {
        const elm = refScroll.current;

        if (!elm) return;

        const isOverScrollRight = elm.scrollLeft <= 0;
        const isOverScrollLeft = elm.scrollLeft >= elm.scrollWidth - elm.clientWidth;

        const refLeft = refArrow.current.left;
        const refRight = refArrow.current.right;

        isOverScrollRight ? refLeft?.classList.add('text-primary/50') : refLeft?.classList.remove('text-primary/50');

        isOverScrollLeft ? refRight?.classList.add('text-primary/50') : refRight?.classList.remove('text-primary/50');
    };

    const handleClickArrow = (type: 'left' | 'right') => {
        const elm = refScroll.current;

        if (!elm) return;

        const currentChildWidth = elm.children[0].clientWidth;

        const scrollSize = currentChildWidth;
        const left = type === 'left' ? elm.scrollLeft - scrollSize : elm.scrollLeft + scrollSize;

        elm.scrollTo({
            left,
            behavior: 'smooth',
        });

        setTimeout(() => {
            handleCheckOverScroll();
        }, 200);
    };

    const handleUpdateIndicator = (value: T) => {
        const tabItem = tabItemRef.current[String(value)];
        if (!tabItem || !indicatorRef.current) return;
        const { offsetLeft, offsetTop } = tabItem;
        const { width, height } = tabItem.getBoundingClientRect();
        indicatorRef.current.style.width = `${width}px`;
        indicatorRef.current.style.height = `${height}px`;
        indicatorRef.current.style.left = `${offsetLeft}px`;
        indicatorRef.current.style.top = `${offsetTop}px`;
    };

    useLayoutEffect(() => {
        if (!value) return;
        handleUpdateIndicator(value);
    }, [value]);

    useEffect(() => {
        handleCheckOverScroll();
    }, []);

    return (
        <div className='relative'>
            <CHorizontalScroll
                ref={refScroll}
                isGrabScroll
                className='row-2 relative overflow-x-auto overflow-y-hidden pr-[96px] scrollbar-hide'
                onWheel={handleCheckOverScroll}
                onWrapStart={handleCheckOverScroll}
            >
                {options.map((option) => {
                    const { value: optionValue, label } = option;

                    const isActive = value === optionValue;

                    return (
                        <div
                            key={String(optionValue)}
                            ref={(el) => {
                                if (!el) return;
                                tabItemRef.current[String(optionValue)] = el;
                            }}
                            className={clsx(
                                'z-10 cursor-pointer select-none text-nowrap rounded-xl px-4 py-2 font-bold hover:bg-primary/10 hover:opacity-hover',
                                {
                                    'text-white': isActive,
                                },
                            )}
                            onClick={() => onChange && onChange(optionValue)}
                        >
                            {label}
                        </div>
                    );
                })}
                <div
                    ref={indicatorRef}
                    className={clsx(
                        'absolute cursor-pointer rounded-xl bg-primary transition-all duration-400 hover:opacity-hover',
                    )}
                />
            </CHorizontalScroll>
            <div className='absolute right-0 top-0 z-20 flex h-full w-[96px] items-center justify-end bg-gradient-to-l from-white via-white/100 to-white/0 py-[2px]'>
                <div className='flex-center gap-[2px]'>
                    <div
                        ref={(ref) => {
                            refArrow.current.left = ref;
                        }}
                        className='flex-center size-8 cursor-pointer text-primary hover:text-primary/50 hover:opacity-hover'
                        onClick={() => handleClickArrow('left')}
                    >
                        <IconChevronDown
                            size={16}
                            className='rotate-90'
                        />
                    </div>
                    <div
                        ref={(ref) => {
                            refArrow.current.right = ref;
                        }}
                        className='flex-center size-8 cursor-pointer text-primary hover:text-primary/50 hover:opacity-hover'
                        onClick={() => handleClickArrow('right')}
                    >
                        <IconChevronDown
                            size={16}
                            className='-rotate-90'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SegmentedControl;
