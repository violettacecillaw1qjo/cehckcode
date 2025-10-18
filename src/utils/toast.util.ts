import { isBoolean } from 'lodash-es';
import { toast, type ToastPosition as ToastifyPosition } from 'react-toastify';

import { ToastPosition, ToastType } from '@/enums/toast.enum';

const positionMapping: Record<string, ToastifyPosition> = {
    tl: 'top-left',
    tc: 'top-center',
    tr: 'top-right',
    bl: 'bottom-left',
    bc: 'bottom-center',
    br: 'bottom-right',
};

export type ShowToastContent = string | any[];

export type ShowToastOptions = {
    t?: ToastType;
    position?: ToastPosition;
    toastId?: string;
    duration?: number;
    autoClose?: number | false;
};

export const showToast = (content?: string | any[], options?: ShowToastOptions) => {
    // content example:
    // const toastId = showToast('Hello', options);
    // showToast(MyComponent, options);
    // showToast(<MyComponent foo={bar}/>, options);
    // showToast(({ closeToast }) => <div>Render props like</div>, options);

    // t: success, info, warning, error

    if (!content) {
        return;
    }
    const { t, position = ToastPosition.BottomRight, toastId, duration, autoClose, ...otherOpts } = options || {};
    return (t ? toast[t] : toast)(content, {
        toastId,
        position: positionMapping[position],
        autoClose: isBoolean(autoClose) ? autoClose : (duration && duration * 1000) || 3000,
        ...otherOpts,
    });
};

export const closeToast = (toastId: string) => toast.dismiss(toastId);
