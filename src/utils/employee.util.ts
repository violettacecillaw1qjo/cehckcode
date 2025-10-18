import { Employee, EmployeeDto } from '@/types/employee.type';

import { getUploadFileUrl } from './file.util';
import { formatPhoneNumber } from './string.util';

export const getFullNameEmployee = (employee: EmployeeDto): string => {
    const { firstName, lastName } = employee;
    return `${firstName}${lastName ? ` ${lastName}` : ''}`;
};

export const parseEmployeeDetail = (payload: EmployeeDto): Employee => {
    const { nickName, phoneSuffix, avatar } = payload;

    const phoneText: string = formatPhoneNumber(phoneSuffix);
    const fullName = getFullNameEmployee(payload);

    return {
        ...payload,
        phoneText,
        nickNameText: nickName || fullName,
        fullName: fullName,
        avatarUrl: avatar ? getUploadFileUrl(avatar) : '',
    };
};
