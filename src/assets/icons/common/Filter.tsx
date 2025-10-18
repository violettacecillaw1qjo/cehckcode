import { IconSvgProps } from '@/types/index.type';

const IconFilter = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M19 28v12.5c0 .562.314 1.077.813 1.334C20.03 41.945 20.265 42 20.5 42c.307 0 .613-.094.872-.279l7-5C28.766 36.439 29 35.984 29 35.5V28H19zM39.5 6h-31C7.122 6 6 7.122 6 8.5v3.089c0 2.313 1.042 4.46 2.858 5.891L18.403 25h11.193l9.545-7.52C40.958 16.049 42 13.901 42 11.589V8.5C42 7.122 40.878 6 39.5 6z'
                fill='currentColor'
            />
        </svg>
    );
};

export default IconFilter;
