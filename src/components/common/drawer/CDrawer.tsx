import type { PressEvent } from '@react-types/shared';

import { Drawer, DrawerContent } from '@heroui/react';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';

import { useTranslation } from '@/cores/i18n';

import { randomString } from '@/utils/string.util';

import IconCancel from '@/assets/icons/common/Cancel';

import CButton from '../button/CButton';
import { BtnColor, BtnVariant } from '../button/CButton.type';

import { CDrawerProps, DrawerPlacement, DrawerSize } from './CDrawer.type';
import { DrawerPlacementClassName, DrawerSizeClasses } from './CDrawer.variable';

const CDrawer = (props: CDrawerProps) => {
    const {
        open,
        hideHeader,
        size = DrawerSize.Medium,
        placement = DrawerPlacement.Right,
        acceptable,
        hideFooter,
        title,
        children,
        className,
        classNames,
        onAccept,
        onClose,
        onOpenChange,
    } = props;

    const { t } = useTranslation();

    const backDropId = useMemo<string>(() => `backDropDrawer-${randomString(10)}`, []);

    const classNamesDrawer = useMemo(() => DrawerPlacementClassName[placement], [placement]);

    useEffect(() => {
        const backdropElement: HTMLDivElement | null = document.querySelector(`.${backDropId}`);

        if (!backdropElement || !open) return;

        backdropElement.addEventListener('click', handleCloseBackdrop);

        return () => {
            backdropElement.removeEventListener('click', handleCloseBackdrop);
        };
    }, [backDropId, open]);

    const handleCloseBackdrop = (e: MouseEvent) => {
        if (!(e.target instanceof HTMLElement) || !e.target.classList.contains(backDropId)) return;

        onClose?.();
        onOpenChange?.(false);
    };

    return (
        <>
            <Drawer
                isDismissable={false}
                placement={placement}
                classNames={{
                    ...classNames,
                    base: clsx(classNamesDrawer?.base, classNames?.base),
                    backdrop: clsx(
                        'fixed inset-0 z-50 h-screen w-screen bg-overlay/50 bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
                        classNames?.backdrop,
                    ),
                    closeButton: 'rounded-xl left-[-48px] w-fit bg-white top-0',
                    wrapper: clsx(backDropId, classNames?.wrapper),
                }}
                closeButton={
                    <div className={'p-2'}>
                        <IconCancel className={'text-primary'} />
                    </div>
                }
                style={{ overflow: 'unset' }}
                isOpen={open}
                onClose={() => onClose?.()}
                onOpenChange={onOpenChange}
            >
                <DrawerContent className={clsx('flex flex-col', classNamesDrawer?.dialog, classNames?.dialog)}>
                    {!hideHeader && (
                        <div className={'flex min-h-[64px] items-center px-4 shadow-medium'}>
                            {title && <b>{title}</b>}
                        </div>
                    )}
                    <div className={'h-full w-full overflow-auto overflow-x-auto rounded-medium scrollbar-hide'}>
                        <div
                            className={clsx(
                                'drawerBg h-full flex-1 overflow-auto rounded-medium',
                                className,
                                DrawerSizeClasses[size][placement],
                            )}
                        >
                            {children}
                        </div>
                    </div>
                    {!hideFooter && (
                        <div className={'flex min-h-[64px] items-center gap-4 px-4 shadow-medium'}>
                            {acceptable && (
                                <CButton
                                    color={BtnColor.Success}
                                    variant={BtnVariant.Solid}
                                    onPress={(e: PressEvent) => onAccept?.(e)}
                                >
                                    <span>{t('confirm')}</span>
                                </CButton>
                            )}
                            <CButton onPress={(e: PressEvent) => onClose?.(e)}>
                                <span>{t('close')}</span>
                            </CButton>
                        </div>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default CDrawer as React.FC<CDrawerProps>;
