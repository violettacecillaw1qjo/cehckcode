import { IconSvgProps } from '@/types/index.type';

const IconDayView = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M17 17H42V23H17zM17 26H42V32H17zM17 14h25v-1.5C42 8.916 39.084 6 35.5 6H17V14zM14 14V6h-1.5C8.916 6 6 8.916 6 12.5V14H14zM6 26H14V32H6zM17 35v7h18.5c3.584 0 6.5-2.916 6.5-6.5V35H17zM14 35H6v.5c0 3.584 2.916 6.5 6.5 6.5H14V35zM6 17H14V23H6z'
                fill='currentColor'
            />
        </svg>
    );
};
export default IconDayView;
