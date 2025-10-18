import { formatText, FormatTextType } from '@/utils/string.util';

import { defaultLocale, defaultNS, locales } from './config';
import { NsI18n } from './enum';

export const I18N_EVENT_CHANGED = 'changed';

export type Language = 'vi' | 'en';
export type NamespaceKey = NsI18n | NsI18n[]; // error | ['error', 'user']
export type TranslateKey = string; // 'namespace:key' | 'key'
export type TranslateOptions = {
    t?: FormatTextType;
    s?: boolean; // strict, return empty string if not found
    c?: number; // count, return plurals version of the text
} & { [variable: string]: any };
export type Translator = (key: TranslateKey, opts?: TranslateOptions) => string;
export type I18nEvent = typeof I18N_EVENT_CHANGED;
export type EventListener = (event: I18nEvent, listener: (...args: any[]) => void) => void;

export const isArray = (val: any) => Array.isArray(val);
export const isString = (val: any) => typeof val === 'string';

// http://lea.verou.me/2016/12/resolve-promises-externally-with-this-one-weird-trick/
const defer = () => {
    let res;
    let rej;
    const promise: any = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
    });
    promise.resolve = res;
    promise.reject = rej;
    return promise;
};

// Binds the member functions of the given class instance so that they can be
// destructured or used as callbacks.
const bindMemberFunctions = (inst: any) => {
    const mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
    mems.forEach((mem) => {
        if (typeof inst[mem] === 'function') {
            inst[mem] = inst[mem].bind(inst);
        }
    });
};

class I18n {
    constructor() {
        bindMemberFunctions(this);
    }

    protected static instance?: I18n | null = null;
    static getInstance() {
        if (!I18n.instance) I18n.instance = new I18n();
        return I18n.instance;
    }

    language: Language = defaultLocale;
    observers: {
        [observer: string]: Map<() => void, number>;
    } = {};
    loadings: {
        [nsid: string]: { [loadUid: number]: (_: any) => void };
    } = {};
    resources: {
        [language: string]: any;
    } = {};

    t(input: string, opts?: TranslateOptions, ns?: string) {
        let result: any;
        try {
            const { t, s, c, ...variables } = opts || {};
            if (!input) {
                return;
            }
            input = String(input);
            if (/[@\s]/.test(input)) {
                return input;
            }
            const inputParts = input.split(':');
            let usedNs = ns ?? defaultNS;
            let usedKey = inputParts[0];
            if (inputParts.length > 1) {
                usedNs = inputParts[0];
                usedKey = inputParts[1];
            }
            const keys = usedKey.split('.');
            for (let idx = 0; idx < keys.length; idx++) {
                const key = keys[idx];
                if (result === null) {
                    break;
                }
                if (typeof result === 'undefined') {
                    if (idx) {
                        break;
                    }
                    result =
                        this.resources[usedNs]?.[this.language]?.[key] ||
                        this.resources[defaultNS]?.[this.language]?.[key] ||
                        null;
                } else if (typeof result === 'object') {
                    result = result[key];
                }
                if (idx == keys.length - 1 && typeof c == 'number' && isArray(result)) {
                    result = result[+!!c];
                }
            }
            if (result) {
                Object.entries(variables).forEach(([key, value]) => {
                    result = result.replace(new RegExp(`{\\{${key}}}`, 'g'), value);
                });
            }
            if (t) {
                result = formatText(t, result);
            }
            if (s && !result) {
                return '';
            }
        } catch (error) {
            console.log(`🚀 I18n -> t -> error:`, [input, opts, ns], error);
        }
        return result || input;
    }

    init = () => {
        this.loadNamespaces(defaultNS);
    };

    on(event: I18nEvent, listener: () => void) {
        if (!this.observers[event]) {
            this.observers[event] = new Map();
        }
        this.observers[event].set(listener, 1);
    }

    off(event: I18nEvent, listener: () => void) {
        if (this.observers[event]) {
            this.observers[event].delete(listener);
        }
    }

    async loadNamespaces(input: NamespaceKey) {
        return Promise.all(
            (isString(input) ? [input] : input).map((ns: string) => {
                const deferred = defer();
                locales.forEach((lng) => {
                    const nsId = `${lng}:${ns}`;
                    const loadUid = Math.random();
                    if (!this.resources[ns]) {
                        this.resources[ns] = {};
                    }
                    const done = (resource?: any) => {
                        if (resource) {
                            this.resources[ns][lng] = resource.default || {};
                        }
                        deferred.resolve();
                    };
                    if (this.loadings[nsId]) {
                        this.loadings[nsId][loadUid] = done;
                    } else {
                        this.loadings[nsId] = {};
                        import(`./locales/${lng}/${ns}`)
                            .then((module) => {
                                // console.log(`🚀 Kds: nsId, loadUid, module:`, nsId, loadUid, module);
                                done(module);
                            })
                            .catch((err) => {
                                console.log(`🚀 Kds: nsId, loadUid, error:`, nsId, loadUid, err);
                                done();
                            })
                            .finally(() => {
                                Object.entries(this.loadings[nsId]).forEach(([key, cb]: any) => {
                                    cb?.();
                                    delete this.loadings[nsId][key];
                                });
                            });
                    }
                });
                return deferred;
            }),
        );
    }

    getFixedT(ns: string) {
        const fixedT = (key: TranslateKey, opts?: TranslateOptions) => {
            return this.t(key, opts, ns);
        };
        return fixedT;
    }

    hasReady = (ns: NamespaceKey) => {
        if (isString(ns)) {
            return !!this.resources[ns];
        }
        return ns.every((n) => this.resources[n]);
    };

    changeLanguage(language: Language) {
        if (language == this.language || !locales.includes(language)) {
            return;
        }
        this.language = language;
        if (this.observers[I18N_EVENT_CHANGED]) {
            this.observers[I18N_EVENT_CHANGED].keys().forEach((observer: any) => {
                observer(language);
            });
        }
    }

    getLng = () => this.language;
}

export type I18nInstance = {
    language: Language;
    t: Translator;
    init: () => void;
    on: EventListener;
    off: EventListener;
    loadNamespaces: (input: NamespaceKey) => Promise<any>;
    hasReady: (input: NamespaceKey) => boolean;
    changeLanguage: (language: string) => void;
    getFixedT: (ns: string) => Translator;
    getLng: () => Language;
};

const i18n = I18n.getInstance();

export default i18n;
