import { IconSvgProps } from '@/types/index.type';

const IconSplitTransaction = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M 7.5 5 C 6.12 5 5 6.12 5 7.5 L 5 8 L 5 40 L 5 40.5 C 5 41.88 6.12 43 7.5 43 L 8 43 L 21.519531 43 C 20.849531 42.13 20.380391 41.11 20.150391 40 L 11 40 C 11 38.343 9.657 37 8 37 L 8 11 C 9.657 11 11 9.657 11 8 L 20 8 C 20 9.657 21.343 11 23 11 L 23 14.519531 C 23.87 13.849531 24.89 13.380391 26 13.150391 L 26 8 L 26 7.5 C 26 6.12 24.88 5 23.5 5 L 23 5 L 8 5 L 7.5 5 z M 15.5 11.5 A 2 2 0 0 0 15.5 15.5 A 2 2 0 0 0 15.5 11.5 z M 27.5 16 C 25.02 16 23 18.02 23 20.5 L 23 38.5 C 23 40.98 25.02 43 27.5 43 L 34 43 L 34 16 L 27.5 16 z M 37 16 L 37 43 L 39.5 43 C 41.98 43 44 40.98 44 38.5 L 44 20.5 C 44 18.02 41.98 16 39.5 16 L 37 16 z M 15.5 19 C 12.46 19 10 21.24 10 24 C 10 26.76 12.46 29 15.5 29 C 17.36 29 19.01 28.159141 20 26.869141 L 20 21.130859 C 19.01 19.840859 17.36 19 15.5 19 z M 15.5 32.5 A 2 2 0 0 0 15.5 36.5 A 2 2 0 0 0 15.5 32.5 z'
                fill='currentColor'
            />
        </svg>
    );
};
export default IconSplitTransaction;
