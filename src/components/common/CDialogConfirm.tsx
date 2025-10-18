import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { forwardRef, useImperativeHandle } from 'react';

import { useTranslation } from '@/cores/i18n';

import CButton from './button/CButton';
import { BtnColor, BtnVariant } from './button/CButton.type';

export type DialogConfirmRef = {
    onOpen: () => void;
};

export type CDialogConfirmProps = {
    msg: string;
    label?: string;
    children?: any;
    confirmColor?: BtnColor;
    onConfirm: (onClose: () => void) => void;
    onClose?: (onClose: () => void) => void;
};

const CDialogConfirm = (props: CDialogConfirmProps, ref: any) => {
    const { label = 'confirm', msg, children, confirmColor, onClose, onConfirm } = props;

    const { t } = useTranslation();

    const { isOpen, onOpen, onClose: onDisClose } = useDisclosure();

    useImperativeHandle<any, DialogConfirmRef>(ref, () => ({
        onOpen: handleOpen,
    }));

    const handleOpen = () => {
        onOpen();
    };

    const handleClose = () => {
        if (!onClose) {
            onDisClose();
        } else {
            onClose(onDisClose);
        }
    };

    const handleConfirm = () => {
        onConfirm(onDisClose);
    };

    return (
        <Modal
            hideCloseButton
            backdrop={'opaque'}
            classNames={{
                base: 'min-w-[400px]',
                backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
            }}
            isOpen={isOpen}
            onOpenChange={onOpen}
        >
            <ModalContent>
                <ModalHeader>
                    <span className={'font-bold'}>{t(label)}</span>
                </ModalHeader>
                <ModalBody className={'flex flex-col gap-6'}>{children || <span>{t(msg)}</span>}</ModalBody>
                <ModalFooter className={'flex gap-4'}>
                    <CButton onPress={handleClose}>{t('close')}</CButton>
                    <CButton
                        color={confirmColor || BtnColor.Success}
                        variant={BtnVariant.Solid}
                        onPress={handleConfirm}
                    >
                        {t('confirm')}
                    </CButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default forwardRef(CDialogConfirm);
