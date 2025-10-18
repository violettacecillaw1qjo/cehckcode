import clsx from 'clsx';
import { useMemo } from 'react';

import { LineColor } from './CLine.type';
import { LineColorClasses } from './CLine.variable';

type CLineProps = {
    className?: any;
    size?: number;
    height?: number;
    color?: LineColor;
    width?: number;
    vertical?: boolean;
};

const CLine = (props: CLineProps) => {
    const { className, size = 1, color = LineColor.Detault, vertical, height, width } = props;

    const style: any = useMemo(() => {
        const _width = width || (vertical ? size : '100%');
        const _height = height || (vertical ? '100%' : size);
        return {
            minWidth: _width,
            maxWidth: _width,
            minHeight: _height,
            maxHeight: _height,
        };
    }, [size, vertical, height, width]);

    return (
        <div
            className={clsx(LineColorClasses[color], className)}
            style={style}
        />
    );
};

export default CLine;
