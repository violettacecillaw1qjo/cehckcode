import { WebCallback, WebData } from '@/enums/web.enum';

class WebMgr {
    static instance: any = null;
    static getInstance() {
        if (!WebMgr.instance) WebMgr.instance = new WebMgr();
        return WebMgr.instance;
    }
    protected static callbacks: any = {};
    protected static datas: any = {};

    protected static webData: any = {};

    setWebCallback = (id: WebCallback, cb?: Function): void => {
        if (!cb) {
            delete WebMgr.callbacks[id];
            return;
        }
        WebMgr.callbacks[id] = cb;
    };
    getWebCallback = (id: WebCallback): Function => WebMgr.callbacks[id] || (() => null);

    setWebData = <T = any>(id: WebData, data?: T): void => {
        if (!data) {
            delete WebMgr.datas[id];
            return;
        }
        WebMgr.datas[id] = data;
    };
    getWebData = <T = any>(id: WebData): T => WebMgr.datas[id];
}

export default WebMgr;
