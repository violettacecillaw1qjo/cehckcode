import { IconSvgProps } from '@/types/index.type';

const IconBusiness = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M 18.5 6 C 16.585045 6 15 7.5850452 15 9.5 L 15 12 L 7.5 12 C 5.57 12 4 13.57 4 15.5 L 4 28 L 21 28 L 21 27.5 C 21 26.67 21.67 26 22.5 26 L 25.5 26 C 26.33 26 27 26.67 27 27.5 L 27 28 L 44 28 L 44 15.5 C 44 13.57 42.43 12 40.5 12 L 33 12 L 33 9.5 C 33 7.5850452 31.414955 6 29.5 6 L 18.5 6 z M 18.5 9 L 29.5 9 C 29.795045 9 30 9.2049548 30 9.5 L 30 12 L 18 12 L 18 9.5 C 18 9.2049548 18.204955 9 18.5 9 z M 4 31 L 4 38.5 C 4 40.43 5.57 42 7.5 42 L 40.5 42 C 42.43 42 44 40.43 44 38.5 L 44 31 L 27 31 L 27 31.5 C 27 32.33 26.33 33 25.5 33 L 22.5 33 C 21.67 33 21 32.33 21 31.5 L 21 31 L 4 31 z'
                fill='currentColor'
            />
        </svg>
    );
};
export default IconBusiness;
