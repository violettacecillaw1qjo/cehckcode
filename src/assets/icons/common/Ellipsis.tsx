import { IconSvgProps } from '@/types/index.type';

const IconEllipsis = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M9 18A6 6 0 109 30 6 6 0 109 18zM24 18A6 6 0 1024 30 6 6 0 1024 18zM39 18A6 6 0 1039 30 6 6 0 1039 18z'
                fill='currentColor'
            />
        </svg>
    );
};

export default IconEllipsis;
