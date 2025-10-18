import { IconSvgProps } from '@/types/index.type';

const IconTickBox = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M22.561,32.561C22.268,32.854,21.884,33,21.5,33s-0.768-0.146-1.061-0.439l-5-5c-0.586-0.586-0.586-1.535,0-2.121 s1.535-0.586,2.121,0l3.939,3.939L41.551,9.328C40.707,7.373,38.761,6,36.5,6h-25C8.468,6,6,8.468,6,11.5v25 c0,3.032,2.468,5.5,5.5,5.5h25c3.032,0,5.5-2.468,5.5-5.5V13.121L22.561,32.561z'
                fill='currentColor'
            />
        </svg>
    );
};

export default IconTickBox;
