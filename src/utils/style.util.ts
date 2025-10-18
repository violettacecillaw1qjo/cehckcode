import { readableColorIsBlack, toHex } from 'color2k';

export const readColorClass = (color?: string | null): string => {
    if (!color) return '';
    return readableColorIsBlack(color) ? 'text-white' : 'text-primary';
};

export const isHex = (color: string): boolean => {
    return color ? /^#([0-9a-f]{3}){1,2}$/i.test(color) : false;
};

export const convertColorHex = (value: string): string => {
    if (value.startsWith('#')) return value;

    const div = document.createElement('div');
    div.className = value;
    document.body.appendChild(div);

    const bgColor = toHex(window.getComputedStyle(div).backgroundColor);
    document.body.removeChild(div);

    return bgColor;
};
