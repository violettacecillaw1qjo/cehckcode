import clsx from 'clsx';
import React, { Fragment } from 'react';

import IconHalfStar from '@/assets/icons/common/HalfStar';
import IconStar from '@/assets/icons/common/Star';
import IconStarOutline from '@/assets/icons/common/StarOutline';

import { CRatingViewProps } from './CRating.type';
import { COLOR_STAR, MAX_STARS } from './CRatingView.variable';

type StarProps = {
    index: number;
    value: number;
    onClick?: (value: number) => void;
    onHover?: (value: number) => void;
};

const Star = (props: StarProps): React.ReactNode => {
    const { index, value } = props;
    const starPosition = index + 1;
    const isFilled = starPosition <= Math.floor(value);
    const isHalf = starPosition === Math.ceil(value) && value % 1 >= 0.5;

    const Icon = isFilled ? IconStar : isHalf ? IconHalfStar : IconStarOutline;

    return (
        <Icon
            size={16}
            className={clsx('cursor-pointer', COLOR_STAR)}
            onMouseEnter={() => props.onHover?.(starPosition)}
            onMouseLeave={() => props.onHover?.(0)}
            onClick={() => props.onClick?.(starPosition)}
        />
    );
};

const CRatingView = (props: CRatingViewProps): React.ReactNode => {
    const { value = 0, style, className, onClick, onHover } = props;

    return (
        <div
            className={clsx('flex items-center', className)}
            style={style}
        >
            {value != 0 && !onClick && !onHover && <span className='mr-2 font-bold'>{value}</span>}
            {Array.from({ length: MAX_STARS }, (_, index) => (
                <Fragment key={index}>
                    <Star
                        index={index}
                        value={value}
                        onClick={onClick}
                        onHover={onHover}
                    />
                </Fragment>
            ))}
        </div>
    );
};

export default CRatingView;
