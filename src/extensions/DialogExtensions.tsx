import { useEffect, useRef, useState } from 'react';

import { WebCallback } from '@/enums/web.enum';

import { setWebCallback } from '@/utils/web.util';

import CDialogConfirm, { CDialogConfirmProps, DialogConfirmRef } from '@/components/common/CDialogConfirm';

const DialogExtension = () => {
    const ref = useRef<DialogConfirmRef>({} as any);

    const [dProps, setDProps] = useState<CDialogConfirmProps | null>(null);

    useEffect(() => {
        setWebCallback(WebCallback.OpenDialogConfirm, handleOpen);
        return () => {
            setWebCallback(WebCallback.OpenDialogConfirm);
        };
    }, []);

    const handleOpen = (dialogProps?: CDialogConfirmProps) => {
        if (dialogProps) {
            setDProps(dialogProps);
        }
        ref.current.onOpen();
    };

    return (
        <CDialogConfirm
            ref={ref}
            {...dProps!}
        />
    );
};

export default DialogExtension;
