import { isNumber, isString } from 'lodash-es';

import { StatusColor } from '@/enums/common.enum';

import { LIST_OF_CHAR, LIST_OF_NUMBER, ONE_HUNGRED } from '@/variables/common.data';

import { bigDivision, bigTimes } from './big.util';

export const isUrl = (str: string) => {
    return /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(str);
};

export const isEmail = (data: string) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        String(data).toLowerCase(),
    );
};

export const isPhoneNumber = (data: string) => {
    return /^\+?[0-9]{10,14}$/.test(data);
};

export const capitalizeStr = (str?: string, all?: boolean) => {
    str = String(str ?? '').trim();
    if (!str) return '';
    const capitalize = (text: string) => text[0].toUpperCase() + text.slice(1);
    return all ? str.split(' ').map(capitalize).join(' ') : capitalize(str);
};

export type FormatTextType = 'lf' | 'l' | 'u' | 'c' | 'ca';
export const formatText = (type: FormatTextType, str?: string) => {
    str = String(str ?? '');
    switch (type) {
        case 'lf':
            return str[0].toLowerCase() + str.substring(1);
        case 'l':
            return str.toLowerCase();
        case 'u':
            return str.toUpperCase();
        case 'c':
            return capitalizeStr(str);
        case 'ca':
            return capitalizeStr(str, true);
        default:
            return str;
    }
};

type TrimStrOptions = {
    type?: FormatTextType;
    full?: boolean;
};
export const trimStr = (str?: string, options?: TrimStrOptions): string => {
    if (!str) return '';
    const { type, full } = options || {};
    str = String(str).trim(); // trim text;
    str = str.replace(full ? / /g : /  +/g, full ? '' : ' '); // full ? replace all space to none : replace 2 space to 1 space;
    if (type) str = formatText(type, str);
    return str;
};

const escapeHtmlChars: any = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
};

export const escapeHtml = (str?: string) => {
    return str ? String(str || '').replace(/[&<>"'`=/]/g, (s) => escapeHtmlChars[s]) : '';
};

export const unescapeHtml = (htmlText?: string) => {
    if (!htmlText) return '';
    htmlText = String(htmlText)
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x2F;/g, '/')
        .replace(/&apos;/g, "'")
        .replace(/&#x3D;/g, '=')
        .replace(/<!DOCTYPE/g, '&lt;!DOCTYPE')
        .replace(/<html/g, '&lt;html')
        .replace(/\/html/g, '&#x2F;html')
        .replace(/<head/g, '&lt;head')
        .replace(/\/head/g, '&#x2F;head')
        .replace(/<body/g, '&lt;body')
        .replace(/\/body/g, '&#x2F;body')
        .replace(/<footer/g, '&lt;footer')
        .replace(/\/footer/g, '&#x2F;footer')
        .replace(/<link/g, '&lt;link')
        .replace(/\/link/g, '&#x2F;link')
        .replace(/<title/g, '&lt;title')
        .replace(/\/title/g, '&#x2F;title')
        .replace(/<meta/g, '&lt;meta')
        .replace(/\/meta/g, '&#x2F;meta')
        .replace(/<script/g, '&lt;script')
        .replace(/\/script/g, '&#x2F;script');
    const blackListAttrs = ['id', 'class'];
    const div = document.createElement('div');
    div.innerHTML = htmlText;
    div.querySelectorAll('*').forEach((node) => {
        for (const attribute of node.attributes) {
            const { name, value } = attribute;
            if (node.hasAttribute(name)) {
                if (name.startsWith('on')) attribute.value = '';
                if (name === 'href' && !isUrl(value)) attribute.value = encodeURI(value);
                if (blackListAttrs.includes(name)) {
                    blackListAttrs.forEach((removeName) => node.removeAttribute(removeName));
                }
            }
        }
    });
    const result = div.innerHTML;
    div.remove();
    return result;
};

export const getHTMLAttributes = (attrs: object, valueWrapper = '"') => {
    return Object.entries(attrs)
        .map(([key, value]) => `${key}=${valueWrapper}${value}${valueWrapper}`)
        .join(' ');
};

// NFC — Normalization Form Canonical Composition. — Dựng Sẵn (mặc định)
// NFD — Normalization Form Canonical Decomposition. — Tổ Hợp
export const removeAccents = (value?: string, toLowerCase: boolean = true) => {
    if (!value) {
        return '';
    }
    value = value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, (c) => (c === 'đ' ? 'd' : 'D'));
    if (toLowerCase) {
        value = value.toLowerCase();
    }
    return value;
};

type RandomStringOptions = {
    num?: boolean;
    up?: boolean;
    low?: boolean;
};
export const randomString = (strLength = 10, options?: RandomStringOptions) => {
    const { num = true, up = true, low = false } = options || {};
    let sources = '';
    if (num) {
        sources += LIST_OF_NUMBER;
    }
    if (up) {
        sources += LIST_OF_CHAR;
    }
    if (low) {
        sources += LIST_OF_CHAR.toLowerCase();
    }
    const length = strLength ?? sources.length;
    return Array.from({ length })
        .map(() => {
            const rnum = Math.floor(Math.random() * sources.length);
            return sources.substring(rnum, rnum + 1);
        })
        .join('');
};

export const snakeToCamel = (str: string) => {
    return str.replace(/(_\w)/g, (m) => m[1].toUpperCase());
};

const rangeAlphabetColors: [string[], StatusColor][] = [
    [['A', 'E'], StatusColor.Primary],
    [['F', 'J'], StatusColor.Info],
    [['K', 'O'], StatusColor.Success],
    [['P', 'T'], StatusColor.Danger],
    [['U', 'Z'], StatusColor.Warning],
];
export const genAvatarColor = (text: string): StatusColor => {
    const firstChar = trimStr(text)[0]?.toUpperCase(); // Lấy ký tự đầu tiên và viết hoa

    for (const item of rangeAlphabetColors) {
        const [[start, end], color] = item;
        if (firstChar >= start && firstChar <= end) return color;
    }
    return StatusColor.Primary;
};

export const formatPrice = (value: string): string => {
    value = value
        .replace(/[^\d.]/g, '')
        .replace(/^(\.)/, '0.')
        .replace(/(\..*)\./g, '$1');

    return value;
};

export const formatDisplayNumber = (value: string | number | null, floatable?: boolean): string => {
    if (isNumber(value)) {
        value = String(value);
    } else if (!isString(value)) {
        value = '';
    }
    value = value
        .replace(/[^\d.]/g, '')
        .replace(/^(\.)/, '0.')
        .replace(/(\..*)\./g, '$1')
        .replace(/^0+(\d)/, '$1');

    if (!floatable) {
        return value;
    }

    let num = parseFloat(value);
    if (isNaN(num)) return '0.00';
    num = bigDivision(Math.floor(bigTimes(num, ONE_HUNGRED)), ONE_HUNGRED);
    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

export const formatPhoneNumber = (phoneNumber?: string): string => {
    const areaCodeLength = 3;
    if (!phoneNumber) return '';
    const trimmed = phoneNumber.trim();
    if (trimmed.length < areaCodeLength) return trimmed;

    const areaCode = trimmed.substring(0, areaCodeLength);
    const remaining = trimmed.substring(areaCodeLength);

    return `(${areaCode}) ${remaining}`;
};

export const formatPhoneToUS = (value: string) => {
    if (!value) return '';

    const RAW_LENGTH_PART1 = 3;
    const RAW_LENGTH_PART2 = 3;
    const RAW_LENGTH_TOTAL = RAW_LENGTH_PART1 + RAW_LENGTH_PART2 + 4;

    const digits = String(value).replace(/\D/g, '');

    if (digits.length <= RAW_LENGTH_PART1) return digits;

    const digitPart1 = digits.slice(0, RAW_LENGTH_PART1);

    if (digits.length <= RAW_LENGTH_PART1 + RAW_LENGTH_PART2)
        return [digitPart1, digits.slice(RAW_LENGTH_PART1)].join('-');

    const digitPart2 = digits.slice(RAW_LENGTH_PART1, RAW_LENGTH_PART1 + RAW_LENGTH_PART2);

    if (digits.length <= RAW_LENGTH_TOTAL)
        return [digitPart1, digitPart2, digits.slice(RAW_LENGTH_PART1 + RAW_LENGTH_PART2)].join('-');

    return [
        digitPart1,
        digitPart2,
        digits.slice(RAW_LENGTH_PART1 + RAW_LENGTH_PART2, RAW_LENGTH_TOTAL),
        digits.slice(RAW_LENGTH_TOTAL),
    ].join('-');
};
