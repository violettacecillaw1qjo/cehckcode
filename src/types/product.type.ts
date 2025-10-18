import { CostType, PlatformType } from '@/enums/common.enum';

import { CommonTblItem } from './common.type';
import { TaxConfig } from './service.type';

export type ProductServiceCharge = {
    value: number;
    type: CostType;
};

export type ProductConfigs = {
    isCommission: boolean;
    isDisplayHomePage: boolean;
    isStock: boolean;
    isTax: boolean;
    tax: TaxConfig;
    sku: string;
    stock: number;
    serviceCharge: ProductServiceCharge;
    barcode: string;
    measure: string;
    prodBrand: string;
    supplyPrice: number;
};

export type ProductDto = {
    code: string;
    name: string;
    desc: string;
    price: number;
    platforms: PlatformType[];
    tagIds: string[];
    categoryIds: string[];
    productType: string;
    userIds: string[];
    configs: Partial<ProductConfigs>;
    images: string[];
} & CommonTblItem;
