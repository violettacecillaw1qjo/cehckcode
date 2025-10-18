import { io } from 'socket.io-client';

import { SocketCallback } from '@/enums/socket.enum';

import { soraDomains } from '@/constants/domains';

class SocketMgr {
    static instance: any = null;
    static getInstance() {
        if (!SocketMgr.instance) SocketMgr.instance = new SocketMgr();
        return SocketMgr.instance;
    }

    static socket: any = null;
    static isResetSocket: boolean = false;
    static resetCb: any = {};
    static queueCb: any = {};

    initSocket = (cb?: Function) => {
        if (!SocketMgr.socket) {
            // const { accessToken } = getLoginSession() || {};
            // if (!accessToken) {
            //     return;
            // }
            // const { tenant_id } = jwtDecode(accessToken || '') as AccessToken;
            // const auth: any = {
            //     token: accessToken,
            //     tenant: tenant_id,
            //     parent: tenant_id,
            //     user: tenant_id,
            // };
            const socketUrl: string = soraDomains.socket;
            const socket = io(socketUrl, {
                transports: ['websocket'],
                // auth,
            });
            SocketMgr.socket = socket;
            if (cb) {
                SocketMgr.resetCb['init'] = cb;
                cb(socket);
            }
        }
    };

    getSocket(id: SocketCallback, cb?: Function) {
        SocketMgr.resetCb[id] = cb;
        if (cb) {
            if (SocketMgr.socket) cb(SocketMgr.socket);
            else SocketMgr.queueCb[id] = cb;
        }
    }

    removeCbId(id: SocketCallback) {
        delete SocketMgr.resetCb[id];
    }

    reConnectSocket() {
        SocketMgr.isResetSocket = true;
        this.initSocket();
    }
}

export default SocketMgr;
