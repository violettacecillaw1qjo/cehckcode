import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { defaultNS } from './config';
import { I18nContext } from './context';
import {
    I18N_EVENT_CHANGED,
    I18nInstance,
    isArray,
    NamespaceKey,
    TranslateKey,
    TranslateOptions,
    Translator,
} from './instance';

type JoinTranslatorArgs = (TranslateKey | [TranslateKey, TranslateOptions])[];

export const useTranslation = (
    ns: NamespaceKey = defaultNS,
): {
    t: Translator;
    j: (...args: JoinTranslatorArgs) => string;
    i18n: I18nInstance;
    ready: boolean;
} => {
    const { i18n } = (useContext(I18nContext) || {}) as { i18n: I18nInstance };
    if (!i18n) {
        throw new Error('useTranslation must be used within a I18nProvider');
    }
    const isMounted = useRef(true);

    const [usedNs] = useMemo(() => {
        return [
            isArray(ns) ? ns[0] : ns,
            i18n.hasReady(ns),
        ];
    }, [i18n, ns]);

    const t = useCallback(i18n.getFixedT(usedNs), [usedNs]);

    const [ready, setReady] = useState(i18n.hasReady(ns));

    useEffect(() => {
        function onReady() {
            setReady(true);
        }
        if (!ready) {
            i18n.loadNamespaces(ns).then(() => {
                if (isMounted.current) {
                    onReady();
                }
            });
        }
        i18n.on(I18N_EVENT_CHANGED, onReady);
        return () => {
            isMounted.current = false;
            i18n.off(I18N_EVENT_CHANGED, onReady);
        };
    }, []);

    return {
        ready,
        i18n,
        t,
        j: (...args: JoinTranslatorArgs) => {
            if (!ready) {
                return '';
            }
            return args
                .map((input) =>
                    /* @ts-expect-error: skip array spread types */
                    t(...(isArray(input) ? input : [input])),
                )
                .join(' ');
        },
    };
};
