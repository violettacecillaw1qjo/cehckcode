import { IconSvgProps } from '@/types/index.type';

const IconDragHandle = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M15.938 3.9380000000000006A5 5 0 1015.938 13.938 5 5 0 1015.938 3.9380000000000006zM15.938 18.938A5 5 0 1015.938 28.938 5 5 0 1015.938 18.938zM15.938 33.938A5 5 0 1015.938 43.938 5 5 0 1015.938 33.938zM31.938 3.9380000000000006A5 5 0 1031.938 13.938 5 5 0 1031.938 3.9380000000000006zM31.938 18.938A5 5 0 1031.938 28.938 5 5 0 1031.938 18.938zM31.938 33.938A5 5 0 1031.938 43.938 5 5 0 1031.938 33.938z'
                fill='currentColor'
            />
        </svg>
    );
};

export default IconDragHandle;
