import { HeroUIPluginConfig } from '@heroui/react';
import { readableColor } from 'color2k';
import { isArray } from 'lodash-es';
import { Config } from 'tailwindcss/types/config';
import Values from 'values.js';

const colorWeight = 17.5;

interface ColorShades {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
}
type ThemeType = 'light' | 'dark';
interface ThemeColor extends ColorShades {
    foreground: string;
    DEFAULT: string;
}

export enum ThemeColors {
    White = 'white',
    Black = 'black',
    Primary = 'primary',
    Red = 'red',
    Orange = 'orange',
    Yellow = 'yellow',
    Lime = 'lime',
    Green = 'green',
    Cyan = 'cyan',
    Blue = 'blue',
    Indigo = 'indigo',
    Pink = 'pink',
    Purple = 'purple',
    Rosa = 'rosa',
    Zinc = 'zinc',
    Background = 'background',
    Gray = 'gray',
    Storm = 'storm',
}

export const themeColors: Record<ThemeColors, string> = {
    white: '#ffffff',
    black: '#000000',
    primary: '#090f19',
    red: '#fc5c65',
    orange: '#e47d24',
    yellow: '#f7b731',
    lime: '#3ad071',
    green: '#78bd1a',
    cyan: '#7EE7FC',
    blue: '#00aef4',
    indigo: '#615fff',
    pink: '#ff4ecd',
    purple: '#6c63ff',
    rosa: '#ff1f57',
    zinc: '#71717a',
    background: '#f7f7f7',
    gray: '#96a5a6',
    storm: '#35495e',
};

export const screenBreakPoints = {
    '4xs': 320,
    '2xs': 360,
    xs: 425,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const;

const rgbValueToHex = (c: number) => {
    const hex = c.toString(16);

    return hex.length == 1 ? '0' + hex : hex;
};

const rgbToHex = ([r, g, b]: number[]): string => {
    return '#' + rgbValueToHex(r) + rgbValueToHex(g) + rgbValueToHex(b);
};
const generateShades = (color: string, weight: number) => {
    const values = new Values(color);
    const colorValues = values.all(weight);

    return colorValues.slice(0, colorValues.length - 1).reduce((acc, shadeValue, index) => {
        (acc as any)[index === 0 ? 50 : index * 100] = rgbToHex(shadeValue.rgb);

        return acc;
    }, {} as ColorShades);
};

const swapColorValues = (colors: ColorShades) => {
    const swappedColors: Partial<ColorShades> = {};
    const keys = Object.keys(colors) as unknown as Array<keyof ColorShades>;
    const length = keys.length;

    for (let i = 0; i < length / 2; i++) {
        const key1 = keys[i];
        const key2 = keys[length - 1 - i];

        swappedColors[key1] = colors[key2];
        swappedColors[key2] = colors[key1];
    }
    if (length % 2 !== 0) {
        const middleKey = keys[Math.floor(length / 2)];
        swappedColors[middleKey] = colors[middleKey];
    }

    return swappedColors as ColorShades;
};

const generateThemeColor = (color: string, theme: ThemeType): ThemeColor => {
    const lightShades = generateShades(color, colorWeight);
    const darkShades = swapColorValues(lightShades);
    const baseColor = theme === 'light' ? lightShades[500] : lightShades[500];

    return {
        ...(theme === 'light' ? lightShades : darkShades),
        foreground: readableColor(baseColor),
        DEFAULT: baseColor,
    };
};
const colors = Object.fromEntries(
    [
        ...Object.keys(themeColors).map((color: string) => [color]),
        ['danger', 'red'],
        ['warning', 'orange'],
        ['success', 'green'],
        ['info', 'blue'],
        ['background', 'background'],
    ].map(([name, color]) => {
        const _color = (themeColors as any)[color || name];
        return [
            name,
            {
                DEFAULT: _color,
                ...(!['black', 'white'].includes(name) && generateShades(_color, colorWeight)),
            },
        ];
    }),
);

const nextUiColors = Object.fromEntries(
    [
        'white',
        'black',
        'primary',
        'blue',
        'cyan',
        'green',
        'pink',
        'purple',
        'red',
        'yellow',
        'zinc',
    ].map((color: string) => {
        let value: any = (themeColors as any)[color];
        if (!['white', 'black'].includes(color)) {
            value = generateShades(value, colorWeight);
        }
        return [color, value];
    }),
);

const getColor = (colors: any) => {
    let baseColor;
    if (isArray(colors)) {
        const [main, opacity] = (colors || []) as string[];
        baseColor = nextUiColors[main][opacity];
    } else {
        baseColor = nextUiColors[colors];
    }
    return baseColor;
};

const themeConfigs = Object.fromEntries(
    Object.entries({
        light: {
            brand: {
                default: ['zinc', '500'],
                primary: ['primary', '500'],
                secondary: ['blue', '500'],
                success: ['green', '500'],
                warning: ['yellow', '500'],
                danger: ['red', '500'],
            },
            background: 'white',
            foreground: 'black',
            base: {
                content1: 'white',
                content2: ['zinc', '100'],
                content3: ['zinc', '200'],
                content4: ['zinc', '300'],
            },
        },
        dark: {
            brand: {
                default: ['zinc', '700'],
                primary: ['primary', '500'],
                secondary: ['blue', '500'],
                success: ['green', '500'],
                warning: ['yellow', '500'],
                danger: ['red', '500'],
            },
            background: 'white',
            foreground: 'black',
            base: {
                content1: ['zinc', '900'],
                content2: ['zinc', '800'],
                content3: ['zinc', '700'],
                content4: ['zinc', '600'],
            },
        },
    }).map(([mode, modeData]: any) => {
        const results: any = {};
        Object.entries(modeData).forEach(([type, typeData]: any) => {
            switch (type) {
                case 'brand':
                    Object.entries(typeData).forEach(([key, colors]) => {
                        results[key] = generateThemeColor(getColor(colors), mode);
                    });
                    break;
                case 'foreground':
                    results[type] = generateThemeColor(nextUiColors[typeData], mode);
                    break;
                case 'background':
                    results[type] = nextUiColors[typeData];
                    break;
                case 'base':
                    Object.entries(typeData).forEach(([key, colors]: any) => {
                        const baseColor = getColor(colors);
                        results[key] = {
                            DEFAULT: baseColor,
                            foreground: readableColor(baseColor),
                        };
                    });
                    break;
            }
        });
        return [mode, results];
    }),
);

const spacingConfigs = Object.fromEntries(
    Array.from({ length: 8 }).map((_: any, idx: number) => {
        const num: number = idx + 1;
        return [num, num * 4 + 'px'];
    }),
);
const opacityConfigs = {
    '2': '.02',
    '25': '.25',
    '75': '.75',
    ...Object.fromEntries(
        Array.from({ length: 10 }).map((_: any, idx: number) => {
            if (idx % 10 === 0) {
                return !!(idx / 10) ? ['100', 1] : ['0', '0'];
            }
            return [`${idx}0`, '.' + idx];
        }),
    ),
};

const screenBreakPointsConfigs = Object.fromEntries(
    Object.entries(screenBreakPoints).map(([key, value]) => {
        return [key, value + 'px'];
    }),
);

const nextUiConfigs: HeroUIPluginConfig = {
    themes: themeConfigs,
    layout: {
        fontSize: {
            large: '24px',
            medium: '18px',
            small: '15px',
            tiny: '12px',
        },
        lineHeight: {
            large: 'normal',
            medium: '24px',
            small: '20px',
            tiny: '16px',
        },
    },
};

const tailwindConfigs: Config['theme'] = {
    extend: {
        colors,
        fontFamily: {
            sans: ['Roboto', 'var(--font-sans)'],
            mono: ['var(--font-mono)'],
        },
        fontSize: {
            xs: ['12px', { lineHeight: '16px' }],
            base: ['15px', { lineHeight: '20px' }],
            lg: ['18px', { lineHeight: '24px' }],
            xl: ['22px', { lineHeight: '29px' }],
            '2xl': ['24px', { lineHeight: '32px' }],
        },
        screens: screenBreakPointsConfigs,
        opacity: opacityConfigs,
        spacing: spacingConfigs,
        keyframes: {
            'slide-in-left': {
                '0%': { transform: 'translateX(100%)', opacity: '0' },
                '100%': { transform: 'translateX(0)', opacity: '1' },
            },
            'slide-in-right': {
                '0%': { transform: 'translateX(-100%)', opacity: '0' },
                '100%': { transform: 'translateX(0)', opacity: '1' },
            },
        },
        animation: {
            'slide-in-left': 'slide-in-left 0.3s ease-out',
            'slide-in-right': 'slide-in-right 0.3s ease-out',
        },
        backgroundImage: ({ theme }) => ({
            'timeline-grid': `
              repeating-linear-gradient(
                to bottom,
                transparent,
                transparent calc(var(--height-per-row)),
                ${theme('colors.primary.DEFAULT / 0.05')} var(--height-per-row),
                transparent calc(var(--height-per-row) + 1px)
              ),
              linear-gradient(
                to bottom,
                transparent,
                transparent calc(var(--height-per-hour) - 1px),
                ${theme('colors.primary.DEFAULT / 0.1')} 1px
              )
            `,

            'diagonal-grid': `repeating-linear-gradient(45deg,${theme('colors.primary.DEFAULT / 0.1')} 0px,
                ${theme('colors.primary.DEFAULT / 0.1')} 0px, transparent 1px, transparent 6px)`,

            stripes: `repeating-linear-gradient(90deg, ${theme('colors.primary.DEFAULT / 0.1')}, ${theme('colors.primary.DEFAULT / 0.1')} ${theme('spacing.2')}, transparent ${theme('spacing.2')}, transparent ${theme('spacing.4')})`,
        }),
    },
    container: {
        center: true,
        screens: {
            md: '688px',
        },
    },
};

export default { tailwindConfigs, nextUiConfigs };
