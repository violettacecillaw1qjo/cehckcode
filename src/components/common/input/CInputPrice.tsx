import { forwardRef, useMemo } from 'react';

import { CostType, Percent } from '@/enums/common.enum';

import { MAX_MONEY_LENGTH } from '@/variables/common.data';

import CInput, { CInputProps } from './CInput';

export type CInputPriceProps = Omit<CInputProps, 'isPrice' | 'type' | 'endContent'> & {
    type?: CostType;
};

const units: Record<CostType, string> = {
    [CostType.Money]: '$',
    [CostType.Percent]: '%',
};

const CInputPrice = (props: CInputPriceProps, ref: any) => {
    const { max, type = CostType.Money, maxLength } = props;

    const isMoney = useMemo(() => type === CostType.Money, [type]);

    const maxValue = useMemo(() => (isMoney ? max : Percent.OneHundred), [isMoney, max]);

    return (
        <CInput
            ref={ref}
            {...props}
            isPrice
            max={maxValue}
            endContent={units[type]}
            maxLength={maxLength || MAX_MONEY_LENGTH}
        />
    );
};

export default forwardRef(CInputPrice);
