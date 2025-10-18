import { Customer, CustomerDto } from '@/types/customer.type';

import { getUploadFileUrl } from './file.util';
import { formatPhoneNumber } from './string.util';

export const parseCustomerInfo = (payload: CustomerDto): Customer => {
    const { firstName, lastName, phoneSuffix, avatar } = payload;
    return {
        ...payload,
        avatar: getUploadFileUrl(avatar),
        fullName: `${firstName}${lastName ? ` ${lastName}` : ''}`,
        phoneText: formatPhoneNumber(phoneSuffix),
    };
};
