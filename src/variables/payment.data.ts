import { CostType } from '@/enums/common.enum';
import { PaymentBillMethod } from '@/enums/payment.enum';

import { OptionItem } from '@/types/common.type';
import { PaymenTipOption } from '@/types/payment.type';

import IconAppleInc from '@/assets/icons/common/AppleInc';
import IconCreditCard from '@/assets/icons/common/CreditCard';
import IconEdit from '@/assets/icons/common/Edit';
import IconGoogle from '@/assets/icons/common/Google';
import IconUnavailable from '@/assets/icons/common/Unavailable';

import { CostUnit } from './common.data';

export const PaymentTipOptions: PaymenTipOption[] = [
    {
        value: 0,
        label: 'noTip',
        isNoTip: true,
        type: CostType.Percent,
        endIcon: IconUnavailable,
    },
    ...[5, 10, 15, 20].map((i: number) => ({
        value: i,
        type: CostType.Percent,
        label: `${i}${CostUnit[CostType.Percent]}`,
    })),
    {
        value: 0,
        label: 'customTip',
        isCustom: true,
        type: CostType.Money,
        icon: IconEdit,
    },
];

export const PaymentMethodOptions: OptionItem<PaymentBillMethod>[] = [
    {
        value: PaymentBillMethod.Apple,
        label: '',
        desc: 'Pay',
        icon: IconAppleInc,
    },
    {
        value: PaymentBillMethod.Google,
        label: '',
        desc: 'Pay',
        icon: IconGoogle,
    },
    {
        value: PaymentBillMethod.Credit,
        label: 'creditCard',
        icon: IconCreditCard,
    },
];
