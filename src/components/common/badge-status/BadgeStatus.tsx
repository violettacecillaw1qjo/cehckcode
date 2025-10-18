import clsx from 'clsx';

import { BadgeStatusColor } from './BadgeStatus.type';
import { BadgeColorClasses } from './BadgeStatus.variable';

type BadgeStatusProps = {
    color?: BadgeStatusColor;
    className?: any;
};

const BadgeStatus = (props: BadgeStatusProps) => {
    const { color = BadgeStatusColor.Primary, className } = props;
    return (
        <div
            className={clsx(
                'absolute right-0 top-0',
                'max-h-3 min-h-3 min-w-3 max-w-3',
                'rounded-lg',
                BadgeColorClasses[color],
                className,
            )}
        />
    );
};

export default BadgeStatus;
