import { CategoryType } from '@/enums/classify.enum';

import { SoraDto } from '@/types/common.type';

import { ProductDto } from './product.type';
import { ServiceDto } from './service.type';

export type CategoryModal = {
    id?: string;
    categoryName: string;
    categoryParent: {
        label: string;
        value: string;
    };
    color: string;
    desc?: string;
    isShowBookOnline: boolean;
    isShowCheckInApp?: boolean;
    [key: string]: any;
};

export enum CategoryModule {
    Service = 'service',
    Product = 'product',
}

export type ClassifyConfigDto = {
    isBookingOnline: boolean;
    isCheckInApp: boolean;
};

export type ClassifyData = {
    id: string;
    color: string;
    name: string;
    parentId?: string;
    config: ClassifyConfigDto;
    image?: string;
};

export type ParsedClassifyData = ClassifyData & {
    children?: ParsedClassifyData[];
};

export type ClassifyDto = {
    name?: string;
    icon: string;
    description: string;
    parentId: string;
    sortIndex: number;
    color: string;
    configs: {
        isBookingOnline: boolean;
        isCheckInApp: boolean;
    };
} & SoraDto;

export type ServiceDtoByType = {
    type: CategoryType.Service;
} & ServiceDto;

export type ProductDtoByType = {
    type: CategoryType.Product;
} & ProductDto;

export type ServiceDtoOrProductDto = ServiceDtoByType | ProductDtoByType;
