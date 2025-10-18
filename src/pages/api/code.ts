import { ApiCodeCheck } from '@/services/check-code.api';

import { arrayNotEmpty } from '@/utils/common.util';

export default async function handler(req: any, res: any) {
    const { method, headers, body } = req;

    if (method === 'POST') {
        const token = headers.authorization?.split(' ')[1];
        const contents = JSON.parse(body);

        if (!token || !arrayNotEmpty(contents)) return;

        const promiseArr = contents.map(async (item) => {
            const api = ApiCodeCheck(item?.promoCode || '');
            const response = await fetch(api.url, {
                method: 'get',

                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });

            return {
                item,
                response: await response.json(),
            };
        });
        const ress = await Promise.all(promiseArr);

        res.status(200).json(ress);
    }

    res.status(200).json({ success: true });
}
