import { BookingTimeFutureType } from '@/enums/booking.enum';
import { DateFormat, Moment, TimeUnit } from '@/enums/date.enum';

import { BookingMappingStoreHours } from '@/types/booking.type';
import { StoreBookingOnlineConfig, StoreBookingOnlineConfigDto, StoreDto, StoreParsed } from '@/types/store.type';

import { googleDomains } from '@/constants/domains';

import { MAX_IMAGES_STORE } from '@/variables/booking.data';
import { MappingCountryOptions } from '@/variables/store.data';

import { addDaysTz, addMonthsTz } from './date-tz.util';
import { getBEOfDate, getFormatDate } from './date.util';
import { getUploadFileUrl } from './file.util';
import { formatPhoneNumber, unescapeHtml } from './string.util';

const getFutureTime = (timeFuture: number, timeFutureType: BookingTimeFutureType) => {
    const currentDate = new Date(getBEOfDate(TimeUnit.DAY, Moment.BEGIN));

    switch (timeFutureType) {
        case BookingTimeFutureType.Day:
            return addDaysTz(currentDate, timeFuture);
        case BookingTimeFutureType.Month:
            return addMonthsTz(currentDate, timeFuture);
    }
};

export const parseDataStore = (data: StoreDto): StoreParsed => {
    const { avatar, bannerImage, promotionImage, address, phoneSuffix, images = [], storeHours = [] } = data;

    const { city, country, value, state, zip } = address || {};

    const phoneNumber = formatPhoneNumber(phoneSuffix);

    const currentDate = getBEOfDate(TimeUnit.DAY, Moment.BEGIN);

    const nameCountry = MappingCountryOptions[country || '']?.label;

    const addressFormatted = [value, city, state, nameCountry, zip].filter(Boolean).join(', ');

    const imagesUrl = images.map((image) => getUploadFileUrl(image));

    const mappingWorkingTimeStore: BookingMappingStoreHours = {};

    const workingTimeStore = storeHours.map((item) => {
        const { day, timeRanges = [] } = item;

        const startTime = timeRanges.at(0)?.from || 0;
        const endTime = timeRanges.at(-1)?.to || 0;

        const workingTimeLabel = timeRanges
            .map((timeRange) => {
                const { from, to } = timeRange;
                const startTime = getFormatDate(DateFormat.Time, currentDate + from);
                const endTime = getFormatDate(DateFormat.Time, currentDate + to);
                return `${startTime} - ${endTime}`;
            })
            .join(', ');

        const dataItem = {
            ...item,
            startTime,
            endTime,
            workingTimeLabel,
        };

        mappingWorkingTimeStore[day] = dataItem;

        return dataItem;
    });

    return {
        ...data,
        imagesUrl,
        mappingWorkingTimeStore,
        avatarUrl: getUploadFileUrl(avatar),
        bannerImageUrl: getUploadFileUrl(bannerImage),
        promotionImageUrl: getUploadFileUrl(promotionImage),
        imagesUrlShow: imagesUrl.slice(0, MAX_IMAGES_STORE),
        addressFormatted,
        phoneNumber,
        workingTimeStore,
    };
};

export const parseDataStoreBookingConfig = (data: StoreBookingOnlineConfigDto): StoreBookingOnlineConfig => {
    const { isAvailability, timeFuture = 0, timeFutureType = BookingTimeFutureType.Day } = data || {};

    const disableDate = isAvailability ? getFutureTime(timeFuture, timeFutureType) : undefined;

    return {
        ...data,
        disableDate,
    };
};

export const getStoreLocationLink = (address: string) => {
    return `${googleDomains.map}?q=${address}&output=embed`;
};

export const replaceMappingImage = (content: string, mappingImage: Record<string, string>) => {
    const div = document.createElement('div');
    div.innerHTML = unescapeHtml(content);

    const imgNodes = div.querySelectorAll('img');

    imgNodes.forEach((imgNode) => {
        const imgId = imgNode.getAttribute('data-id');
        if (!imgId) return;

        if (!mappingImage[imgId]) return;
        imgNode.setAttribute('src', getUploadFileUrl(mappingImage[imgId]));
    });

    return div.innerHTML;
};
