import { IconSvgProps } from '@/types/index.type';

const IconCopy = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M 18.5 5 C 15.467 5 13 7.467 13 10.5 L 13 32.5 C 13 35.533 15.467 38 18.5 38 L 34.5 38 C 37.533 38 40 35.533 40 32.5 L 40 10.5 C 40 7.467 37.533 5 34.5 5 L 18.5 5 z M 11 10 L 9.78125 10.8125 C 8.66825 11.5545 8 12.803625 8 14.140625 L 8 33.5 C 8 38.747 12.253 43 17.5 43 L 30.859375 43 C 32.197375 43 33.4465 42.33175 34.1875 41.21875 L 35 40 L 17.5 40 C 13.91 40 11 37.09 11 33.5 L 11 10 z'
                fill='currentColor'
            />
        </svg>
    );
};
export default IconCopy;
