import { createElement, useMemo } from 'react';

import { I18nContext } from './context';

export function I18nProvider({ i18n, children }: any) {
    const value: any = useMemo(() => ({ i18n }), [i18n]);
    return createElement(I18nContext.Provider, { value }, children);
}
