import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config.js';

const { theme } = resolveConfig(tailwindConfig as any);

export default theme;
