import { Gender } from '@/enums/common.enum';

import { SoraDto } from './common.type';

// DTO
export type CustomerDto = {
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    birthday: number;
    gender: Gender;
    id: string;
    tenantId: string;
    refId: string;
    phoneSuffix: string;
    phonePrefix: string;
} & SoraDto;

export type Customer = {
    fullName: string;
    phoneText: string;
} & CustomerDto;
