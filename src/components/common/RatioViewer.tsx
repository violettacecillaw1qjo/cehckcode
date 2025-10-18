import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type RatioViewerProps = PropsWithChildren & {
    ratio?: number; // 16/9 | 9/16 | 3/4 | 4/3
    width?: number | string;
    maxWidth?: number | string;
    style?: object;
    className?: string;
    cntClassName?: string;
};

const RatioViewer = (props: RatioViewerProps) => {
    const { children, ratio = 1, width = '100%', maxWidth, cntClassName, className, style, ...rest } = props;
    if (!ratio) return children || null;
    return (
        <div
            {...rest}
            className={className}
            style={{ width, maxWidth, ...style }}
        >
            <div style={{ width: '100%', paddingTop: `${ratio * 100}%`, position: 'relative' }}>
                <div className={clsx('absolute bottom-0 left-0 right-0 top-0 *:h-full *:w-full', cntClassName)}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default RatioViewer;
