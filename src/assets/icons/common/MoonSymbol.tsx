import { IconSvgProps } from '@/types/index.type';

const IconMoonSymbol = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M 24 4 C 12.972292 4 4 12.972292 4 24 C 4 35.027708 12.972292 44 24 44 C 27.983824 44 31.697341 42.818934 34.8125 40.810547 A 1.50015 1.50015 0 0 0 34.8125 38.289062 C 30.115303 35.262409 27 30.010704 27 24 C 27 17.989296 30.115303 12.737591 34.8125 9.7109375 A 1.50015 1.50015 0 0 0 34.8125 7.1894531 C 31.697341 5.1810663 27.983824 4 24 4 z M 24 7 C 26.627951 7 29.025212 7.7442617 31.242188 8.8105469 C 26.878309 12.477492 24 17.86155 24 24 C 24 30.13845 26.878309 35.522508 31.242188 39.189453 C 29.025212 40.255738 26.627951 41 24 41 C 14.593708 41 7 33.406292 7 24 C 7 14.593708 14.593708 7 24 7 z'
                fill='currentColor'
            />
        </svg>
    );
};

export default IconMoonSymbol;
