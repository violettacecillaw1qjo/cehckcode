import axios, { AxiosRequestConfig, Method } from 'axios';

export type DoRequestOptions<T = any> = {
    isUpload?: boolean;
    noAuth?: boolean;
    cancelId?: string;
    params?: Record<string, any>;
    body?: T;
    headers?: any;
    configs?: AxiosRequestConfig;
};

export default class ApiMgr {
    protected static instance?: ApiMgr | null = null;
    static getInstance() {
        if (!ApiMgr.instance) ApiMgr.instance = new ApiMgr();
        return ApiMgr.instance;
    }

    protected static reqSources: any = {};
    protected static isRedirectToLoginPage = false;

    async doRequest(method: Method, url: string, options?: DoRequestOptions) {
        const { isUpload, cancelId, params, body, headers, configs, noAuth } = options || {};
        try {
            const _headers: any = {
                'Content-Type': isUpload ? 'multipart/form-data' : 'application/json',
                ...headers,
            };
            if (!['post', 'put'].includes(String(method).toLowerCase())) {
                delete _headers['Content-Type'];
            }
            if (!noAuth) {
                const validAccessToken = await this.validateAccessToken();
                if (validAccessToken) {
                    _headers.Authorization = `Bearer ${validAccessToken}`;
                }
            }
            const _url = new URL(url);
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    _url.searchParams.append(key, value);
                });
            }
            const reqConfig: any = {
                method,
                url: String(_url),
                headers: _headers,
                timeout: 0,
                data: isUpload ? body : JSON.stringify(body || {}),
                maxContentLength: 100000000,
                ...configs,
            };
            if (cancelId) {
                const reqSrc = axios.CancelToken.source();
                ApiMgr.reqSources[cancelId] = reqSrc;
                reqConfig.cancelToken = reqSrc.token;
            }
            const apiResp = await axios.request(reqConfig);
            this.clearCancelSource(cancelId);
            return apiResp.data;
        } catch (error: any) {
            this.clearCancelSource(cancelId);
            if (error?.response?.data === 'Unauthorized') {
                if (!ApiMgr.isRedirectToLoginPage) {
                    ApiMgr.isRedirectToLoginPage = true;
                    // authExpired();
                }
            } else {
                if (error?.code === 'ECONNABORTED') {
                    error.message = 'timeout_exceeded';
                }
                throw error;
            }
        }
    }

    cancelRequest(cancelId?: string) {
        if (cancelId) ApiMgr.reqSources[cancelId]?.cancel();
    }

    clearCancelSource(cancelId?: string) {
        if (cancelId) {
            delete ApiMgr.reqSources[cancelId];
        }
    }

    validateAccessToken() {
        return new Promise(() => {
            // const { accessToken } = getLoginSession() || {};
            // if (!accessToken) {
            //     return resolve(null);
            // }
            // const { exp } = jwtDecode(accessToken) as AccessToken;
            // const curTime = +new Date();
            // switch (true) {
            //     case exp * 1000 < curTime:
            //         if (!ApiMgr.isRedirectToLoginPage) {
            //             window.alert(i18n.t('error:loginSessionExpired'));
            //             setLoginSession();
            //             ApiMgr.isRedirectToLoginPage = true;
            //             console.log(`[DEBUG] forceLogout ~ Expired!`);
            //         }
            //         break;
            //     default:
            //         resolve(accessToken);
            //         break;
            // }
        });
    }
}
