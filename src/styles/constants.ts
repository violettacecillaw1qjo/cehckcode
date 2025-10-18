export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

export const getBreakpoint = (name: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => `(max-width: ${breakpoints[name]})`;

export const hexColorOpacities = {
    5: '0d',
    10: '1a',
    16: '29',
    20: '33',
    24: '3d',
    30: '4d',
    32: '52',
    40: '66',
    50: '80',
    60: '99',
    64: 'a3',
    70: 'b3',
    80: 'cc',
    90: 'e6',
};
