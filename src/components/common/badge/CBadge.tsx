import clsx from 'clsx';
import { useMemo } from 'react';

import { BadgeColor, BadgeSize } from './CBadge.type';
import { BadgeColorClasses, BadgeSizeClasses } from './CBadge.variable';

export type CBadgeProps = {
    size?: BadgeSize;
    color?: BadgeColor;
    className?: any;
    value?: number;
};

const CBadge = (props: CBadgeProps) => {
    const { className, color = BadgeColor.Primary, size = BadgeSize.Small, value } = props;

    const classNames = useMemo<string>(() => {
        return clsx('flex-center select-none border-1', BadgeColorClasses[color], BadgeSizeClasses[size]);
    }, [
        size,
        color,
    ]);

    return (
        <div className={clsx(classNames, className)}>
            <span>{value}</span>
        </div>
    );
};

export default CBadge;
