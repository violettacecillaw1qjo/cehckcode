import { Method } from 'axios';
import { isArray, isObject } from 'lodash-es';

import ApiMgr, { DoRequestOptions } from '@/cores/api';

import { toJson } from './base.util';

const apiInstance = ApiMgr.getInstance();

export const doRequest = (method: Method, url: string, options?: DoRequestOptions) => {
    return apiInstance.doRequest(method, url, options);
};
export const cancelRequest = (cancelId?: string) => {
    apiInstance.cancelRequest(cancelId);
};

export const clearApiRequest = (ids: object) => {
    Object.values(ids || {}).forEach((id) => cancelRequest(id));
};

export const getLocalStorage = (id: string) => {
    try {
        const value = localStorage.getItem(id) ?? '';
        return ['{', '['].some((i) => value.startsWith(i)) ? toJson(value) : value;
    } catch {}
};

export const setLocalStorage = (id: string, value: any) => {
    try {
        switch (true) {
            case isArray(value):
                localStorage.setItem(id, JSON.stringify(value));
                break;
            case isObject(value):
                localStorage.setItem(id, JSON.stringify({ ...getLocalStorage(id), ...value }));
                break;
            default:
                localStorage.setItem(id, value);
                break;
        }
    } catch {}
};

export const removeLocalStorage = (id: string) => {
    try {
        localStorage.removeItem(id);
    } catch {}
};
