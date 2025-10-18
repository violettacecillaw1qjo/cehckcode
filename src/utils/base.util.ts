import { isArray, isNumber, isObject, isString } from 'lodash-es';
import { v1 as uuidv1 } from 'uuid';

export const toJson = (data: any) => {
    try {
        if (isObject(data) || isArray(data)) {
            return data;
        }
        let json = null;
        if (isString(data)) {
            json = JSON.parse(data);
            if (isString(json)) {
                json = JSON.parse(json);
            }
        } else {
            json = JSON.parse(JSON.stringify(data));
        }
        return json;
    } catch {
        return null;
    }
};

export const miniTimer = (time: number) =>
    new Promise((resolve) => (isNumber(time) ? setTimeout(resolve, time) : resolve(true)));

export const genUuid = (): string => {
    return uuidv1();
};

export const withUuid = (obj: any) => {
    return {
        uid: genUuid(),
        ...obj,
    };
};

export const genArrayUuid = (length = 0) => Array.from({ length }).map(() => genUuid());
