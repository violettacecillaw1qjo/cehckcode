import { IconSvgProps } from '@/types/index.type';

const IconCircledMenu = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M24 29c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5S26.757 29 24 29zM36 29c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5S38.757 29 36 29zM12 29c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5S14.757 29 12 29zM24 17.028c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5S26.757 17.028 24 17.028zM36 17c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5S38.757 17 36 17zM12 17c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5S14.757 17 12 17zM24 41.028c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5S26.757 41.028 24 41.028zM36 41c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5S38.757 41 36 41zM12 41c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5S14.757 41 12 41z'
                fill='currentColor'
            />
        </svg>
    );
};
export default IconCircledMenu;
