/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer');

module.exports = () => {
    const plugins = [
        withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }),
    ];
    return plugins.reduce((acc, next) => next(acc), {
        output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
        reactStrictMode: false,
        env: {
            SVG_COLOR: '#1e3150',
            TINY_MCE_KEY: 'wdmfl1ceihw9lm06k7wins38khbii8ldtarit2bx44ptvjnd',
        },
    });
};
