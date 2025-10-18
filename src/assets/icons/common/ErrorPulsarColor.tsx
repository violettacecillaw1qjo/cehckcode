import { IconSvgProps } from '@/types/index.type';

const IconErrorPulsarColor = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                fill='#ffe082'
                d='M25.4,12.6l-15.5,28c-1.1,2,0.3,4.5,2.6,4.5h31c2.3,0,3.8-2.5,2.6-4.5l-15.5-28C29.5,10.5,26.5,10.5,25.4,12.6z'
            />
            <path
                fill='none'
                stroke='#18193f'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='3'
                d='M35.4,23.9L26.6,8.1c-1.1-2.1-4.1-2.1-5.3,0l-5.7,10.3'
            />
            <path
                fill='none'
                stroke='#18193f'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='3'
                d='M12.5,24.1L5.9,36c-1.1,2,0.3,4.5,2.6,4.5h31c2.3,0,3.8-2.5,2.6-4.5l-3.8-6.9'
            />
            <line
                x1='24'
                x2='24'
                y1='17.5'
                y2='27.5'
                fill='none'
                stroke='#18193f'
                strokeLinecap='round'
                strokeWidth='3'
            />
            <circle
                cx='24'
                cy='34'
                r='2'
                fill='#18193f'
            />
        </svg>
    );
};
export default IconErrorPulsarColor;
