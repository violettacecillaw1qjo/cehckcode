import { Button } from '@heroui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { useDisclosure } from '@heroui/use-disclosure';
import clsx from 'clsx';
import { toHex } from 'color2k';
import randomColor from 'randomcolor';
import { forwardRef, PropsWithChildren, useImperativeHandle, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { isPressEnter } from '@/utils/common.util';

import IconColor from '@/assets/icons/common/Color';
import IconColorDropper from '@/assets/icons/common/ColorDropper';
import IconDone from '@/assets/icons/common/Done';
import IconPaintPalette from '@/assets/icons/common/PaintPalette';

type Props = PropsWithChildren & {
    color?: string;
    placement?:
        | 'top'
        | 'bottom'
        | 'right'
        | 'left'
        | 'top-start'
        | 'top-end'
        | 'bottom-start'
        | 'bottom-end'
        | 'left-start'
        | 'left-end'
        | 'right-start'
        | 'right-end';
    onSelect?: (color: string) => void;
};

export type ColorPickerRef = {
    open: () => void;
};

const colorClasses: string[] = [
    'bg-primary',
    'bg-orange-500',
    'bg-yellow',
    'bg-lime',
    'bg-green',
    'bg-cyan',
    'bg-blue',
    'bg-indigo',
    'bg-pink',
    'bg-violet-500',
    'bg-purple',
    'bg-rosa',
    'bg-stone-500',
    'bg-black',
    'bg-white',
    'bg-zinc',
];

const ColorPicker = (props: Props, ref: any) => {
    const { children, color, placement = 'top-end', onSelect } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [pickingColor, setPickingColor] = useState(color ?? randomColor());
    const [isSelectMode, setIsSelectMode] = useState<boolean>(true);

    useImperativeHandle(ref, () => ({
        open: () => onOpen(),
    }));

    const handleFocusInput = () => {
        inputRef.current?.focus();
    };

    const handleSelected = () => {
        onClose();
        setIsSelectMode(true);
        onSelect?.(pickingColor);
    };

    const handleSelect = (e: any) => {
        const bgColor = window.getComputedStyle(e.target).backgroundColor;
        setPickingColor(toHex(bgColor));
    };

    const toggleEyeDropperColor = () => {
        if ('EyeDropper' in window) {
            const eyeDropper = new (window as any).EyeDropper();
            eyeDropper
                .open()
                .then((result: any) => {
                    const color = result.sRGBHex;
                    setPickingColor(color);
                })
                .catch((e: any) => {
                    console.error(e);
                });
        }
    };

    return (
        <Popover
            placement={placement}
            isOpen={isOpen}
            onOpenChange={(status) => {
                if (status) {
                    onOpen();
                    setTimeout(() => {
                        handleFocusInput();
                    }, 0);
                } else {
                    onClose();
                }
            }}
        >
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent className='gap-2.5 py-2.5'>
                {isSelectMode ? (
                    <div className={'h-[200px] w-[200px]'}>
                        <div className={'grid grid-cols-4 gap-1'}>
                            {colorClasses.map((className: string) => (
                                <div
                                    key={className}
                                    className={clsx(
                                        className,
                                        'aspect-square cursor-pointer rounded-md border-1 border-foreground/20',
                                    )}
                                    onClick={handleSelect}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <HexColorPicker
                        className={'w-full'}
                        color={pickingColor}
                        onChange={(value) => {
                            setPickingColor(value);
                            handleFocusInput();
                        }}
                    />
                )}
                <div className='flex w-[200px] flex-col gap-1'>
                    <div
                        className={clsx(
                            'flex gap-1',
                            '[&>button]:h-8 [&>button]:min-w-2 [&>button]:flex-1 [&>button]:rounded-md [&>button]:!p-0',
                        )}
                    >
                        <Button onPress={() => setIsSelectMode(true)}>
                            <IconPaintPalette />
                        </Button>
                        <Button onPress={() => setIsSelectMode(false)}>
                            <IconColor />
                        </Button>
                        <Button onPress={toggleEyeDropperColor}>
                            <IconColorDropper />
                        </Button>
                    </div>
                    <div className='flex gap-1'>
                        <div className={'relative'}>
                            <div
                                className={
                                    'absolute left-3 top-[50%] h-3.5 w-3.5 translate-y-[-50%] rounded-full border-1 border-foreground/20'
                                }
                                style={{ background: pickingColor || 'unset' }}
                            />
                            <input
                                ref={inputRef}
                                value={pickingColor || '-'}
                                maxLength={7}
                                className={'h-8 w-full flex-1 rounded-md bg-default-200 text-center outline-none'}
                                onKeyDown={(e) => isPressEnter(e) && handleSelected()}
                                onChange={(e) => setPickingColor(e.target.value)}
                            />
                        </div>
                        <Button
                            color={'success'}
                            className='h-8 min-w-16 rounded-md'
                            onPress={handleSelected}
                        >
                            <IconDone />
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default forwardRef(ColorPicker);
