import { DiscountSharing } from '@/enums/booking.enum';
import { CostType } from '@/enums/common.enum';

import { CommonTblItem } from './common.type';

export type ServiceSearchParams = {
    tenantId: string;
};

export type TaxConfig = {
    type: CostType;
    value: number;
};

export type Duration = {
    // value: string;
    limit: boolean;
    min: number;
    max: number;
    minute: number;
};

export type ProductCharge = {
    value: number;
    type: CostType;
};

export type ServiceConfigs = {
    isFree: boolean;
    isSpecial: boolean;
    isAddUp: boolean;
    isRequestedPrice: boolean;
    isCommission: boolean;
    isTax: boolean;
    tax: TaxConfig;
    turnCount: number;
    skipCount: boolean;
    duration: Duration;
    productCharge: ProductCharge;
};

export type Discount = {
    type: CostType;
    value: number;
    sharing?: DiscountSharing;
};

export type ServiceDto = {
    code: string;
    name: string;
    desc: string;
    price: number;
    discount: Discount;
    platforms: string[];
    tagIds: string[];
    categoryIds: string[];
    allowUserIds: string[];
    configs: Partial<ServiceConfigs>;
    costType: CostType;
    serviceCost: number;
    limit: boolean;
    min: number;
    max: number;
    images: string[];
} & CommonTblItem;
