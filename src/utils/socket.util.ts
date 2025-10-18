import { SocketCallback } from '@/enums/socket.enum';

import SocketMgr from '@/cores/socket';

const SocketInstance = SocketMgr.getInstance();

export const initSocket = (cb?: Function) => SocketInstance.initSocket(cb);
export const getSocket = (id: SocketCallback, cb?: (socket: any) => void) => SocketInstance.getSocket(id, cb);
export const removeSocketCbId = (id: SocketCallback) => SocketInstance.removeCbId(id);
