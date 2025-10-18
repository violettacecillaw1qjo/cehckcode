import { heroui } from '@heroui/react';

import CustomComponents from './src/styles/component';
import configTheme from './src/styles/config';
const { tailwindConfigs, nextUiConfigs } = configTheme;

export default {
    content: [
        ...[
            './pages',
            './layouts',
            './components',
            './extensions',
            './variables',
            './hooks',
        ].map((i) => `./src/${i}/**/*.{js,ts,jsx,tsx,mdx}`),
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: tailwindConfigs,
    darkMode: 'class',
    plugins: [
        heroui(nextUiConfigs),
        require('@tailwindcss/typography'),
        CustomComponents,
    ],
};
