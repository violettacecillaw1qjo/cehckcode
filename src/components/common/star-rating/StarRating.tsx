import clsx from 'clsx';
import { useMemo } from 'react';

import { arrayFrom } from '@/utils/common.util';

import IconStar from '@/assets/icons/common/Star';
import IconStarGradient from '@/assets/icons/common/StarGradient';
import IconStarOutline from '@/assets/icons/common/StarOutline';

type StarRatingProps = {
    isOutline?: boolean;
    isDisabled?: boolean;
    value: number;
    max?: number;
    size?: number;
    classNames?: {
        wrapper?: string;
        star?: string;
    };
    onChange?: (value: number) => void;
};
const StarRating = (props: StarRatingProps) => {
    const { isOutline, isDisabled = false, value, size, max = 5, classNames = {}, onChange } = props;

    const stars = useMemo(() => arrayFrom(max), [max]);

    const handleChangeStarRating = (newValue: number) => {
        if (!onChange || isDisabled || newValue == value) return;
        onChange(newValue);
    };

    return (
        <div className={clsx('flex gap-[2px]', classNames.wrapper)}>
            {stars.map((item, index) => {
                const isActive = index < value;

                const IconComp = isOutline ? (isActive ? IconStarGradient : IconStarOutline) : IconStar;

                return (
                    <div
                        key={item}
                        data-active={isActive}
                        className={clsx(
                            'text-primary/10 data-[active=true]:text-orange',
                            {
                                'cursor-pointer': !isDisabled,
                            },
                            classNames.star,
                        )}
                        onClick={() => handleChangeStarRating(index + 1)}
                    >
                        <IconComp size={size} />
                    </div>
                );
            })}
        </div>
    );
};

export default StarRating;
