import { soraDomains } from '@/constants/domains';

import { DoRequestOptions } from '@/cores/api';

import { ApiRequestorReq } from '@/utils/api.util';

export const ApiCodeCheck = (code: string, options?: DoRequestOptions): ApiRequestorReq => ({
    ...options,
    url: `${soraDomains.gpt}backend-api/promotions/metadata/${code}`,
    method: 'GET',
    noAuth: true,
    skipPayload: true,
    skipValidate: true,
});
