import { IconSvgProps } from '@/types/index.type';

const IconMonthView = ({ size = 20, width, height, ...props }: IconSvgProps) => {
    return (
        <svg
            viewBox='0 0 48 48'
            width={size || width}
            height={size || height}
            role={'presentation'}
            aria-hidden={true}
            focusable={false}
            {...props}
        >
            <path
                d='M 12.5 6 C 8.9280619 6 6 8.9280619 6 12.5 L 6 35.5 C 6 39.071938 8.9280619 42 12.5 42 L 35.5 42 C 39.071938 42 42 39.071938 42 35.5 L 42 12.5 C 42 8.9280619 39.071938 6 35.5 6 L 12.5 6 z M 12.5 9 L 35.5 9 C 37.450062 9 39 10.549938 39 12.5 L 39 35.5 C 39 37.450062 37.450062 39 35.5 39 L 12.5 39 C 10.549938 39 9 37.450062 9 35.5 L 9 12.5 C 9 10.549938 10.549938 9 12.5 9 z M 15.5 17 A 2.5 2.5 0 0 0 15.5 22 A 2.5 2.5 0 0 0 15.5 17 z M 24 17 A 2.5 2.5 0 0 0 24 22 A 2.5 2.5 0 0 0 24 17 z M 32.5 17 A 2.5 2.5 0 0 0 32.5 22 A 2.5 2.5 0 0 0 32.5 17 z M 15.5 27 A 2.5 2.5 0 0 0 15.5 32 A 2.5 2.5 0 0 0 15.5 27 z M 24 27 A 2.5 2.5 0 0 0 24 32 A 2.5 2.5 0 0 0 24 27 z'
                fill='currentColor'
            />
        </svg>
    );
};
export default IconMonthView;
