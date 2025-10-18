import clsx from 'clsx';
import { useLayoutEffect, useRef } from 'react';

import { CTabProps } from './CTab.type';

const CTab = <T,>(props: CTabProps<T>) => {
    const { value, className, classNames = {}, options, onChange } = props;

    const tabItemRef = useRef<Record<string, HTMLDivElement>>({});
    const indicatorRef = useRef<HTMLDivElement>(null);

    const handleChangeTab = (value: T) => {
        if (!onChange) return;
        onChange(value);
        // handleUpdateIndicator(value);
    };

    const handleUpdateIndicator = (value: T) => {
        const tabItem = tabItemRef.current[String(value)];
        if (!tabItem || !indicatorRef.current) return;
        const { offsetLeft } = tabItem;
        const { width, height } = tabItem.getBoundingClientRect();
        indicatorRef.current.style.width = `${width}px`;
        indicatorRef.current.style.height = `${height}px`;
        indicatorRef.current.style.left = `${offsetLeft || 0}px`;
        indicatorRef.current.style.top = `${tabItem.offsetTop}px`;
    };

    useLayoutEffect(() => {
        if (!value) return;
        handleUpdateIndicator(value);
    }, [value]);

    return (
        <div className={clsx('flex', className, classNames.wrapper)}>
            <div className={clsx('relative flex gap-[2px] rounded-xl bg-black/5 p-[2px]', classNames.base)}>
                {options.map((item) => {
                    const { value: valueTab } = item;
                    const isActive = value === valueTab;
                    return (
                        <div
                            key={String(valueTab)}
                            ref={(el) => {
                                if (!el) return;
                                tabItemRef.current[String(valueTab)] = el;
                            }}
                            onClick={() => handleChangeTab(valueTab)}
                            className={clsx(
                                'z-10 flex cursor-pointer items-center whitespace-nowrap rounded-[10px] px-3 py-1 text-small font-bold text-primary/50',
                                {
                                    'bg-transparent !text-primary': isActive,
                                },
                                classNames.tab,
                            )}
                        >
                            {item.label}
                        </div>
                    );
                })}
                <div
                    ref={indicatorRef}
                    className={clsx(
                        'absolute cursor-pointer rounded-[10px] bg-white transition-all duration-400',
                        classNames.indicator,
                    )}
                />
            </div>
        </div>
    );
};

export default CTab;
