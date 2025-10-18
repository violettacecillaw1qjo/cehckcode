import { IconSvgProps } from '@/types/index.type';

const IconToday = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M42 14v-1.5C42 8.916 39.084 6 35.5 6h-23C8.916 6 6 8.916 6 12.5V14H42zM6 17v18.5c0 3.584 2.916 6.5 6.5 6.5h23c3.584 0 6.5-2.916 6.5-6.5V17H6zM32.615 23.503l-9 10C23.34 33.809 22.951 33.989 22.54 34c-.013 0-.026 0-.04 0-.397 0-.779-.158-1.061-.439l-5-5c-.586-.585-.586-1.536 0-2.121.586-.586 1.535-.586 2.121 0l3.882 3.882 7.942-8.825c.554-.616 1.502-.667 2.118-.111C33.119 21.939 33.169 22.888 32.615 23.503z'
                fill='currentColor'
            />
        </svg>
    );
};
export default IconToday;
