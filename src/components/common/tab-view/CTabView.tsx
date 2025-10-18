import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';

import { NsI18n, useTranslation } from '@/cores/i18n';

import { preventDefaultClickEvent } from '@/utils/dom.util';

import IconCancel from '@/assets/icons/common/Cancel';

import CHorizontalScroll from '../CHorizontalScroll';

import { TabViewColor, TabViewItem } from './CTabView.type';
import { TabViewColorClasses } from './CTabView.variable';

type CTabViewProps = {
    tabIdx: number;
    tabs: TabViewItem[];
    gap?: number;
    lineGap?: number;
    className?: any;
    classNames?: {
        tab?: string;
    };
    color?: TabViewColor;
    nsI18n?: NsI18n;
    onClick?: (tabIdx: number) => void;
    onDelete?: (tabIdx: number) => void;
};

const CTabView = (props: CTabViewProps) => {
    const {
        tabIdx,
        tabs,
        className,
        classNames = {},
        gap = 32,
        lineGap = 16,
        color = TabViewColor.Primary,
        nsI18n,
        onClick,
        onDelete,
    } = props;
    const { t, i18n } = useTranslation(nsI18n);

    const refs = useRef<any>({});
    const refWrapper = useRef<HTMLDivElement>(null);

    const [renderReady, setRenderReady] = useState<number>(0);

    const { indicatorSize, indicatorLeft } = useMemo<any>(() => {
        const ref: any = refs.current[tabIdx] || {};
        const { offsetLeft } = ref || {};
        const { width } = ref.getBoundingClientRect?.() || {};
        return {
            indicatorLeft: offsetLeft || 0,
            indicatorSize: width || 0,
        };
    }, [tabIdx, renderReady, tabs]);

    useEffect(() => {
        setRenderReady(+new Date());
    }, [i18n.language, tabs.length]);

    useEffect(() => {
        if (!refWrapper.current) return;
        refWrapper.current.scrollTo({
            left: indicatorLeft,
            behavior: 'smooth',
        });
    }, [indicatorLeft]);

    const initRef = (idx: number) => (ref: any) => {
        refs.current[idx] = ref;
    };

    const handleClick = (idx: number) => {
        onClick?.(idx);
    };

    const handleDelete = (e: React.MouseEvent, value: number) => {
        preventDefaultClickEvent(e as unknown as Event);
        onDelete?.(value);
    };

    return (
        <CHorizontalScroll
            ref={refWrapper}
            isGrabScroll
            className='w-full overflow-x-scroll scrollbar-hide'
        >
            <div
                className={clsx('row-2 relative', className)}
                style={{
                    gap,
                    paddingBottom: lineGap,
                }}
            >
                {tabs.map((item: TabViewItem, idx: number) => {
                    const { deletable, value, label } = item;
                    return (
                        <div
                            key={value}
                            data-value={value}
                            data-active={value === tabIdx}
                            className={clsx('cursor-pointer items-center whitespace-nowrap', classNames.tab)}
                            ref={initRef(idx)}
                            onClick={() => handleClick(idx)}
                        >
                            <b>{t(label)}</b>
                            {deletable && (
                                <IconCancel
                                    size={16}
                                    className='cursor-pointer'
                                    onClick={(e) => handleDelete(e, idx)}
                                />
                            )}
                        </div>
                    );
                })}
                <span
                    style={{
                        width: indicatorSize,
                        left: indicatorLeft,
                        display: renderReady ? 'unset' : 'none',
                    }}
                    className={clsx(
                        'absolute bottom-0 h-[2px] w-[16px] rounded-[1px] transition-left',
                        TabViewColorClasses[color],
                    )}
                />
            </div>
        </CHorizontalScroll>
    );
};

export default CTabView;
