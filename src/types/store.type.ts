import { BookingNotiChannelType, BookingTimeFutureType } from '@/enums/booking.enum';
import { DayOfWeekType } from '@/enums/common.enum';

import { BookingMappingStoreHours } from './booking.type';
import { CommonDto } from './common.type';

export type StoreProfileDto = {
    name: string;
    avatar: string;
    hotlines: string[];
    address?: StoreProfileAddress;
};

export type StoreProfileAddress = {
    value: string;
    city: string;
    state: string;
    zip: string;
    country: string;
};

export type StoreLocationDto = {
    lat: number;
    lon: number;
    mapUrl: string;
};

export type StoreImagePolicyDto = {
    id: string;
    src: string;
};

export type StorePolicyDto = {
    policy: string;
    images: StoreImagePolicyDto[];
};

export type StoreDto = {
    isBookingOnline: boolean;
    aboutUs: string;
    avatar: string;
    email: string;
    name: string;
    phonePrefix: string;
    phoneSuffix: string;
    parentId: string;
    address: StoreProfileAddress;
    tenantId: string;
    timezone: string;
    uniqueId: string;
    location: StoreLocationDto;
    storeHours: StoreHourDto[];
    images: string[];

    bannerImage?: string;
    promotionImage?: string;
} & CommonDto;

export type StoreBookingOnlineConfigDto = {
    isAvailability: boolean;
    isConfirmAppt: boolean;
    isGroupAppt: boolean;
    isServicePrice: boolean;
    isTechReview: boolean;
    isWorkingSchedule: boolean;
    notiChannel: BookingNotiChannelType;
    sendConfig: string;
    timeFuture: number;
    timeFutureType: BookingTimeFutureType;
    timeReservation: number;
};

export type StoreHourDto = {
    enable: boolean;
    day: DayOfWeekType;
    timeRanges: {
        from: number;
        to: number;
    }[];
};

export type StoreParsed = StoreDto & {
    avatarUrl: string;
    imagesUrl: string[];
    imagesUrlShow: string[];
    addressFormatted: string;
    phoneNumber: string;
    mappingWorkingTimeStore: BookingMappingStoreHours;
    workingTimeStore: StoreHour[];
    bannerImageUrl?: string;
    promotionImageUrl?: string;
};

export type StoreHour = StoreHourDto & {
    startTime: number;
    endTime: number;
    workingTimeLabel: string;
};

export type StoreBookingOnlineConfig = StoreBookingOnlineConfigDto & {
    disableDate?: Date;
};
