import { isArray, isEmpty, isUndefined } from 'lodash-es';
import { createRef } from 'react';

import { NestedKeyPath } from '@/types/common.type';

import { loadFile } from './file.util';
import { randomString } from './string.util';

export const toggleOverlaySpinkit = (visible?: boolean) => {
    const spinkit = document.getElementById('overlay-spinkit') as HTMLElement;
    if (spinkit) {
        spinkit.style.display = visible ? 'flex' : 'none';
    }
};

export const initRefs = (...refs: string[]) => {
    return Object.fromEntries(refs.map((i) => [i, createRef()]));
};

export const isPressEnter = (e: any) => e.key === 'Enter';

export const spotlightShow = (
    gallery: {
        src: string;
        media?: 'image' | 'video' | 'node';
        class?: string;
        animation?: string;
    }[],
    options?: {
        index?: number;
        theme?: 'white';
        autohide?: boolean;
        infinite?: boolean;
        control?: ('page' | 'zoom' | 'autofit' | 'fullscreen' | 'close')[] | string;
    },
) => {
    try {
        function show() {
            /* @ts-expect-error: already check exist from global scope */
            Spotlight.show(gallery, {
                index: 1,
                infinite: gallery.length > 1,
                control: ['page', 'autofit', 'zoom', 'close'],
                ...options,
            });
        }
        /* @ts-expect-error: checking exist with global scope */
        if (typeof Spotlight === 'undefined') {
            loadFile('/spotlight.bundle.js').then(show);
        } else {
            show();
        }
    } catch (error) {
        console.log(`🚀 Kds: spotlightShow -> error`, error);
    }
};

export const arrayFrom = (length: number, fromItem = () => randomString()) => Array.from({ length }).map(fromItem);

type ArrayToObjectOptions<T, P> = {
    returnField?: keyof T;
    returnValue?: P;
};
export const arrayToObject = <T = any, P = any>(
    list: T[],
    keyField: keyof T,
    options?: ArrayToObjectOptions<T, P>,
): Record<string, P> => {
    if (!isArray(list) || isEmpty(list)) return {};
    const { returnField, returnValue } = options || {};
    return list.reduce((rs: Record<string, P>, data: T) => {
        if (data) {
            let value: any = data;
            switch (true) {
                case !!returnField:
                    value = (data as any)[returnField];
                    break;
                case !isUndefined(returnValue):
                    value = returnValue;
                    break;

                default:
                    break;
            }
            rs[data[keyField] as string] = value;
        }
        return rs;
    }, {});
};

export const arrayNotEmpty = <T = any>(arr: T[] | null | undefined): arr is T[] => isArray(arr) && !isEmpty(arr);

export const getNestedValue = <T, P extends NestedKeyPath<T>>(obj: T, path: P): any => {
    const paths = path.split('.');
    return paths.reduce((acc: any, key) => (acc ? acc[key] : undefined), obj);
};
