import { WebCallback, WebData } from '@/enums/web.enum';

import WebMgr from '@/cores/web';

import { CDialogConfirmProps } from '@/components/common/CDialogConfirm';

const webInstance = WebMgr.getInstance();

export const getWebCallback = <T extends (...args: any[]) => any>(id: WebCallback): T => {
    return webInstance.getWebCallback(id);
};
export const setWebCallback = <T = any>(id: WebCallback, cb?: T): void => {
    webInstance.setWebCallback(id, cb);
};

export const getWebData = <T = any>(id: WebData): T => {
    return webInstance.getWebCallback(id);
};
export const setWebData = <T = any>(id: WebData, data?: T): void => {
    webInstance.setWebCallback(id, data);
};

export const openDialogConfirm = (dProps?: CDialogConfirmProps) => {
    getWebCallback(WebCallback.OpenDialogConfirm)(dProps);
};
