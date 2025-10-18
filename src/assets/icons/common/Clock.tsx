import { IconSvgProps } from '@/types/index.type';

const IconClock = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z M31.5,27h-8c-0.8,0-1.5-0.7-1.5-1.5v-12c0-0.8,0.7-1.5,1.5-1.5 s1.5,0.7,1.5,1.5V24h6.5c0.8,0,1.5,0.7,1.5,1.5S32.3,27,31.5,27z'
                fill='currentColor'
            />
        </svg>
    );
};
export default IconClock;
