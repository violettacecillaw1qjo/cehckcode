import { md5 } from 'js-md5';

import { ValidUrlProtocols } from '@/constants/configs';
import { soraDomains } from '@/constants/domains';

export const getUploadFileUrl = (url: any, fallbackUrl?: string) => {
    url = String(url?.default || url || '');
    if (!url) {
        return fallbackUrl || '';
    }
    if (!ValidUrlProtocols.some((i) => url.startsWith(i))) {
        url = soraDomains.cdn + url;
    }
    return url;
};

export const getImageSize = (url: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
        const img = new Image();
        const onFinish = (size = { width: 0, height: 0 }) => {
            img.remove();
            resolve(size);
        };
        img.onerror = () => onFinish();
        img.onload = () => onFinish({ width: img.width, height: img.height });
        img.src = url;
    });
};

export const loadFile = (
    url: string,
    options: { asStr?: boolean } = {},
): Promise<{ event?: any; error?: any } | string> =>
    new Promise((resolve) => {
        const { asStr, ...attributes } = options || {};
        const type = url.split(/[/.]/).pop();
        const dataId = type + md5(url);
        if (document.querySelector(`[data-id="${dataId}"]`)) {
            return resolve({});
        }
        let el: HTMLScriptElement | HTMLLinkElement | null = null;
        switch (type) {
            case 'js':
                el = document.createElement('script');
                el.type = 'text/javascript';
                el.src = url;
                el.async = true;
                break;
            case 'css':
                if (asStr) {
                    fetch(url)
                        .then((res) => res.text())
                        .then((data) => {
                            resolve(data);
                        })
                        .catch((error) => {
                            console.error(`🚀 load ${type} -> asStr -> onerror`, error);
                            resolve('');
                        });
                } else {
                    el = document.createElement('link');
                    el.type = 'text/css';
                    el.rel = 'stylesheet';
                    el.href = url;
                }
                break;
            default:
                break;
        }
        if (!el) return;
        Object.entries({
            'data-id': dataId,
            ...attributes,
        }).forEach(([key, value]) => el.setAttribute(key, value));
        el.onload = (event) => {
            resolve({ event });
        };
        el.onerror = (error) => {
            console.error(`🚀 load ${type} -> onerror`, error);
            resolve({ error });
        };
        document.head.append(el);
    });
