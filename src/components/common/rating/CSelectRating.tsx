import { useState } from 'react';

import { CSelectRatingProps } from './CRating.type';
import CRatingView from './CRatingView';

const CSelectRating = (props: CSelectRatingProps): React.ReactNode => {
    const { style, className, onClick } = props;

    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);

    const displayRating = hoveredRating || selectedRating;

    const handleInteraction = (index: number) => {
        setHoveredRating(index);
    };

    const handleClick = (index: number) => {
        setSelectedRating(index);
        onClick?.(index);
    };

    return (
        <CRatingView
            onClick={handleClick}
            onHover={handleInteraction}
            value={displayRating}
            style={style}
            className={className}
        />
    );
};

export default CSelectRating;
