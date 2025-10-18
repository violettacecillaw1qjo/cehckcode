export type CRatingViewProps = {
    value?: number;
    style?: React.CSSProperties;
    className?: string;
    onHover?: (value: number) => void;
    onClick?: (value: number) => void;
};

export type CSelectRatingProps = {
    onClick?: (value: number) => void;
} & CRatingViewProps;
