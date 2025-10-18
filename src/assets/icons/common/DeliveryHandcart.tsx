import { IconSvgProps } from '@/types/index.type';

const IconDeliveryHandcart = ({ size = 20, width, height, ...props }: IconSvgProps) => {
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
                d='M 4.5 7 A 1.50015 1.50015 0 1 0 4.5 10 C 6.4500619 10 8 11.549938 8 13.5 L 8 29.5 C 8 34.728774 12.271226 39 17.5 39 L 18.501953 39 A 2.5 2.5 0 0 0 20.5 43 A 2.5 2.5 0 0 0 22.498047 39 L 35.501953 39 A 2.5 2.5 0 0 0 37.5 43 A 2.5 2.5 0 0 0 39.498047 39 L 43.5 39 A 1.50015 1.50015 0 1 0 43.5 36 L 17.5 36 C 13.892774 36 11 33.107226 11 29.5 L 11 13.5 C 11 9.9280619 8.0719381 7 4.5 7 z M 15.5 10 C 14.672 10 14 10.671 14 11.5 L 14 28.5 C 14 30.981 16.019 33 18.5 33 L 37.5 33 C 39.981 33 42 30.981 42 28.5 L 42 11.5 C 42 10.671 41.328 10 40.5 10 L 15.5 10 z M 24.5 15 L 31.5 15 C 32.328 15 33 15.671 33 16.5 C 33 17.329 32.328 18 31.5 18 L 24.5 18 C 23.672 18 23 17.329 23 16.5 C 23 15.671 23.672 15 24.5 15 z'
                fill='currentColor'
            />
        </svg>
    );
};
export default IconDeliveryHandcart;
