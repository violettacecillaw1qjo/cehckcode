import { IconSvgProps } from '@/types/index.type';

const IconShield = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M38.823,10.943c-5.123-0.534-9.622-3.342-11.847-4.968c-1.779-1.301-4.172-1.301-5.951,0 c-2.226,1.626-6.724,4.434-11.847,4.968c-1.857,0.193-3.25,1.798-3.171,3.652c0.818,19.139,12.832,26.314,16.495,28.058 c0.476,0.227,0.988,0.34,1.499,0.34s1.023-0.114,1.499-0.34c3.663-1.744,15.677-8.919,16.495-28.058 C42.073,12.741,40.68,11.136,38.823,10.943z'
                fill='currentColor'
            />
        </svg>
    );
};

export default IconShield;
