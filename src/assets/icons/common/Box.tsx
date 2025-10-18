import { IconSvgProps } from '@/types/index.type';

const IconBox = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M8 16v20.5c0 3.584 2.916 6.5 6.5 6.5h19c3.584 0 6.5-2.916 6.5-6.5V16H8zM28.5 25h-9c-.829 0-1.5-.672-1.5-1.5s.671-1.5 1.5-1.5h9c.829 0 1.5.672 1.5 1.5S29.329 25 28.5 25zM39.5 14h-31C7.122 14 6 12.879 6 11.5v-4C6 6.121 7.122 5 8.5 5h31C40.878 5 42 6.121 42 7.5v4C42 12.879 40.878 14 39.5 14z'
                fill='currentColor'
            />
        </svg>
    );
};

export default IconBox;
