import { IconSvgProps } from '@/types/index.type';

const IconChevronLeft = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M38.561,8.939l-6.5-6.5c-0.586-0.586-1.535-0.586-2.121,0l-20.5,20.5c-0.586,0.586-0.586,1.535,0,2.121l20.5,20.5 C30.232,45.854,30.616,46,31,46s0.768-0.146,1.061-0.439l6.5-6.5c0.586-0.586,0.586-1.535,0-2.121L25.621,24l12.939-12.939 C39.146,10.475,39.146,9.525,38.561,8.939z'
                fill='currentColor'
            />
        </svg>
    );
};

export default IconChevronLeft;
