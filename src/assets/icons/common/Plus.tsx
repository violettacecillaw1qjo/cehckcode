import { IconSvgProps } from '@/types/index.type';

const IconPlus = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M24,4C12.972,4,4,12.972,4,24s8.972,20,20,20s20-8.972,20-20S35.028,4,24,4z M32.5,25.5h-7v7c0,0.829-0.671,1.5-1.5,1.5 s-1.5-0.671-1.5-1.5v-7h-7c-0.829,0-1.5-0.671-1.5-1.5s0.671-1.5,1.5-1.5h7v-7c0-0.829,0.671-1.5,1.5-1.5s1.5,0.671,1.5,1.5v7h7 c0.829,0,1.5,0.671,1.5,1.5S33.329,25.5,32.5,25.5z'
                fill='currentColor'
            />
        </svg>
    );
};
export default IconPlus;
