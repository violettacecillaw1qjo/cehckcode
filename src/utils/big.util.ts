import Big from 'big.js';

export const bigPlus = (a: number, b: number) => {
    return new Big(a).plus(b).toNumber();
};

export const bigMinus = (a: number, b: number) => {
    return new Big(a).minus(b).toNumber();
};

export const bigTimes = (a: number, b: number) => {
    return new Big(a).times(b).toNumber();
};

export const bigDivision = (a: number, b: number) => {
    return new Big(a).div(b).toNumber();
};
