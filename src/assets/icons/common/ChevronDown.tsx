import { IconSvgProps } from '@/types/index.type';

const IconChevronDown = ({ size = 20, width, height, ...props }: IconSvgProps) => {
    return (
        <svg
            viewBox='0 0 64 64'
            width={size || width}
            height={size || height}
            role={'presentation'}
            aria-hidden={true}
            focusable={false}
            {...props}
        >
            <path
                d='M11.399,21.364l2.861-2.861c1.953-1.953,5.118-1.953,7.071,0l10.668,10.668l10.668-10.668c1.953-1.953,5.118-1.953,7.071,0 l2.861,2.861c1.953,1.953,1.953,5.119,0,7.071L35.535,45.497c-1.953,1.952-5.118,1.952-7.07,0L11.4,28.436 C9.447,26.483,9.447,23.317,11.399,21.364z'
                fill='currentColor'
            />
        </svg>
    );
};

export default IconChevronDown;
