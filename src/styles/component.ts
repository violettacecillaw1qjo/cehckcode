import plugin from 'tailwindcss/plugin';

const CustomComponents = plugin(({ addComponents, theme }) => {
    addComponents({
        '.drawerBg': {
            background: theme('colors.background.DEFAULT'),
        },
        '.row-1': {
            display: 'flex',
            gap: theme('spacing.1'),
        },
        '.row-2': {
            display: 'flex',
            gap: theme('spacing.2'),
        },
        '.row-3': {
            display: 'flex',
            gap: theme('spacing.3'),
        },
        '.row-4': {
            display: 'flex',
            gap: theme('spacing.4'),
        },
        '.row-6': {
            display: 'flex',
            gap: theme('spacing.6'),
        },
        '.col-1': {
            display: 'flex',
            flexDirection: 'column',
            gap: theme('spacing.1'),
        },
        '.col-2': {
            display: 'flex',
            flexDirection: 'column',
            gap: theme('spacing.2'),
        },
        '.col-3': {
            display: 'flex',
            flexDirection: 'column',
            gap: theme('spacing.3'),
        },
        '.col-4': {
            display: 'flex',
            flexDirection: 'column',
            gap: theme('spacing.4'),
        },
        '.col-6': {
            display: 'flex',
            flexDirection: 'column',
            gap: theme('spacing.6'),
        },
        '.flex-center': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        '.statusIcon.primary': {
            color: theme('colors.primary.DEFAULT'),
        },
        '.statusIcon.info': {
            color: theme('colors.info.DEFAULT'),
        },
        '.statusIcon.success': {
            color: theme('colors.success.DEFAULT'),
        },
        '.statusIcon.warning': {
            color: theme('colors.warning.DEFAULT'),
        },
        '.statusIcon.danger': {
            color: theme('colors.danger.DEFAULT'),
        },
        '.transition-common-all': {
            transform: theme('transform.DEFAULT'),
            transition: `all ${theme('transitionDuration.200')} ${theme('transitionTimingFunction.DEFAULT')}`,
        },
    });
});

export default CustomComponents;
