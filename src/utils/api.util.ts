import { AxiosRequestConfig, HttpStatusCode, Method } from 'axios';
import { camelCase, isBoolean, isString } from 'lodash-es';

import { RespStatusCode } from '@/enums/common.enum';
import { ToastType } from '@/enums/toast.enum';

import { AppPagination, PayloadPagination } from '@/types/common.type';

import { DoRequestOptions } from '@/cores/api';
import { i18n } from '@/cores/i18n';

import { miniTimer } from './base.util';
import { toggleOverlaySpinkit } from './common.util';
import { doRequest } from './core.util';
import { getDelayTime } from './date.util';
import { formatText, trimStr } from './string.util';
import { showToast } from './toast.util';

export const validateApiResp = (resp: any, skipPayload: any) => {
    return (
        resp && [HttpStatusCode.Ok, RespStatusCode.Ok].includes(resp.statusCode) && (skipPayload ? true : resp.payload)
    );
};

export const apiCommonOptions = { delay: true, loading: true, error: true };

export type ApiEndpoint = {
    url: string;
    method?: Method;
};

export type ApiRequestorReq<T = any> = {
    url: string;
    method?: Method;
    loading?: boolean;
    delay?: number | boolean;
    debug?: boolean;
    skipValidate?: boolean;
    skipPayload?: boolean;
    error?: boolean;
} & DoRequestOptions<T> &
    AxiosRequestConfig;

export type ApiRequestorRes<T = any> = {
    error: any;
    data: any;
    payload: T;
    cancelId?: string;
    errorMsg?: string;
    [prop: string]: any;
};

export const apiRequestor = async <T = any>(options: ApiRequestorReq): Promise<ApiRequestorRes<T>> => {
    const {
        method = 'post',
        url,
        noAuth,
        // for Requestor
        loading,
        delay,
        debug,
        skipValidate,
        skipPayload,
        error,
        // for doRequest
        isUpload,
        cancelId,
        params,
        body,
        headers,
        ...configs
    } = options || {};
    const reqAt = Date.now();
    let result;
    if (loading) {
        toggleOverlaySpinkit(true);
    }
    try {
        const resp = await doRequest(method, url, {
            isUpload,
            noAuth,
            cancelId,
            params,
            body,
            headers,
            configs,
        });

        if (skipValidate || validateApiResp(resp, skipPayload)) {
            result = {
                ...resp,
                cancelId,
            };
        } else {
            throw resp;
        }
    } catch (_error) {
        console.log(`🚀 : apiCommonRequest -> error`, _error);
        if (debug) {
            console.log(`🚀 : apiCommonRequest -> error`, _error);
        }
        result = { error: _error };
    }
    if (delay) {
        await miniTimer(getDelayTime(reqAt, isBoolean(delay) ? 500 : delay));
    }
    if (loading) {
        toggleOverlaySpinkit();
    }
    if (result.error) {
        result.errorMsg = getApiErrorMsg(result.error, isString(error)) || error;
        if (error) {
            showToast(result.errorMsg, { t: ToastType.Error });
        }
    }
    return result;
};

export const getApiErrorMsg = (payload: any, strict: boolean = false) => {
    const { message, code } = payload?.error || payload || {};
    const defaultCode = 'errorOccurred';
    const errMsg = trimStr(code || message);
    let errCode = defaultCode;
    if (errMsg) {
        switch (errMsg) {
            case 'No value present':
                errCode = 'noValuePresent';
                break;
            case 'Unauthorized':
                errCode = 'unauthorized';
                break;
            case 'Forbidden':
                errCode = 'forbidden';
                break;
            case 'Network Error':
            case 'timeout exceeded':
                errCode = 'network';
                break;
            case 'ERROR':
            case 'INTERNAL_ERROR':
                break;
            default:
                if (errMsg.indexOf(' ') > -1) {
                    return errMsg;
                } else {
                    errCode = camelCase(formatText('l', errMsg));
                }
                break;
        }
    } else if (strict) return;
    const msg: string = i18n.t(`error:${errCode}`, { s: true }) || message || i18n.t(`error:${defaultCode}`);
    return msg;
};

export const parseApiUrlParams = ({ page, size, from, to, keyword, ...params }: any = {}) => {
    const search = [];
    if (page) {
        search.push(`page=${page}`);
    }
    if (size) {
        search.push(`pageSize=${size}`);
    }
    if (from && to) {
        search.push(`from=${from}`);
        search.push(`to=${to}`);
    }
    if (keyword) {
        if (keyword.includes('=')) {
            keyword.split('&').forEach((i: string) => {
                search.push(i);
            });
        } else {
            search.push(`keyword=${keyword}`);
        }
    }
    Object.entries(params).forEach(([key, value]) => {
        if (key !== 'cancelId') {
            search.push(`${key}=${value}`);
        }
    });
    return search.join('&');
};

export const parsePayloadPagination = (payload: PayloadPagination): AppPagination => {
    const { pageNumber, pageSize, totalItems, totalPages, hasNext } = payload || {};

    return {
        hasNext: !!hasNext,
        page: pageNumber || 1,
        size: pageSize || 15,
        totalItem: totalItems || 0,
        totalPage: totalPages || 1,
    };
};

export const apiSimpleRequestor = async <T = any>(options: ApiRequestorReq): Promise<ApiRequestorRes<T>> => {
    const {
        method = 'post',
        url,
        noAuth,
        // for Requestor
        loading,
        delay,
        debug,
        skipValidate,
        skipPayload,

        error,
        // for doRequest
        isUpload,
        cancelId,
        params,
        body,
        headers,
        ...configs
    } = options || {};
    const reqAt = Date.now();
    let result;
    if (loading) {
        toggleOverlaySpinkit(true);
    }
    try {
        const resp = await doRequest(method, url, {
            isUpload,
            noAuth,
            cancelId,
            params,
            body,
            headers,
            configs,
        });

        if (skipValidate || validateApiResp(resp, skipPayload)) {
            result = {
                ...(isString(resp)
                    ? {
                          payload: resp,
                      }
                    : resp),
                cancelId,
            };
        } else {
            throw resp;
        }
    } catch (_error) {
        console.log(`🚀 : apiCommonRequest -> error`, _error);
        if (debug) {
            console.log(`🚀 : apiCommonRequest -> error`, _error);
        }
        result = { error: _error };
    }
    if (delay) {
        await miniTimer(getDelayTime(reqAt, isBoolean(delay) ? 500 : delay));
    }
    if (loading) {
        toggleOverlaySpinkit();
    }
    if (result.error) {
        result.errorMsg = getApiErrorMsg(result.error, isString(error)) || error;
        if (error) {
            showToast(result.errorMsg, { t: ToastType.Error });
        }
    }
    return result;
};
