import { useTheme } from 'next-themes';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { Theme } from '@/enums/style.enum';

import { LSK_CURRENT_I18N_LNG } from '@/constants/configs';

import { defaultLocale, locales, useTranslation } from '@/cores/i18n';

import { getLocalStorage } from '@/utils/core.util';

import BasicExtensions from '@/extensions/basic';

type PageProps = PropsWithChildren;

const RootPage = (props: PageProps) => {
    const { children } = props;

    const [isClient, setIsClient] = useState(false);

    const { setTheme } = useTheme();
    const { i18n } = useTranslation();

    useEffect(() => {
        initI18n();
        setIsClient(true);
        setTheme(Theme.Light);
    }, []);

    const initI18n = useCallback(() => {
        let curLng: string = getLocalStorage(LSK_CURRENT_I18N_LNG);
        if (!locales.includes(curLng)) {
            curLng = defaultLocale;
        }
        i18n.changeLanguage(curLng);
        /*
            i18n.on(I18N_EVENT_CHANGED, onI18nLngChanged);
            update format date
        */
    }, []);

    return (
        <main>
            {isClient && (
                <>
                    {children}
                    <BasicExtensions />
                </>
            )}
        </main>
    );
};

export default RootPage;
