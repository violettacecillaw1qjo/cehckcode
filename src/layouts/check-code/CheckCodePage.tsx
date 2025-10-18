import clsx from 'clsx';
import { Fragment, useState } from 'react';

import { FuncCommonChangeKeyItem } from '@/types/common.type';

import { ApiCodeCheck } from '@/services/check-code.api';

import { apiSimpleRequestor } from '@/utils/api.util';
import { arrayNotEmpty } from '@/utils/common.util';

import CButton from '@/components/common/button/CButton';
import { BtnVariant } from '@/components/common/button/CButton.type';
import CTextArea from '@/components/common/CTextArea';
import CInput from '@/components/common/input/CInput';
import CLine from '@/components/common/line/CLine';

type InputField = {
    token: string;
    content: string;
};

const CheckCodePage = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [inputFields, setInputFields] = useState<InputField>({
        token: '',
        content: '',
    });

    const [responseData, setResponseData] = useState<any[]>();

    const handleCommonChange: FuncCommonChangeKeyItem<InputField> = (key) => (value) => {
        setInputFields((prevState) => ({ ...prevState, [key]: value }));
    };

    const handleSubmit = async () => {
        try {
            setIsFetching(true);

            const { content, token } = inputFields;

            const getItem = (str: string) => {
                try {
                    const url = new URL(str);
                    return url.searchParams.get('promoCode') || '';
                } catch {
                    return String(str);
                }
            };

            const contents = content
                .split('\n')
                .map((item) => {
                    const promoCode = getItem(item);

                    if (!promoCode) return;

                    return {
                        url: item,
                        promoCode,
                    };
                })
                .filter(Boolean);

            if (!token || !arrayNotEmpty(contents)) return;

            const promiseArr = contents.map(async (item) => {
                const response = await apiSimpleRequestor(
                    ApiCodeCheck(item?.promoCode || '', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                );

                return {
                    item,
                    response,
                };
            });
            const res = await Promise.all(promiseArr);
            setResponseData(res);
            console.log('KhiemTQ: handleSubmit -> res', res);
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <div className='container col-4 py-20'>
            <div className='col-6'>
                <CInput
                    value={inputFields.token}
                    label={'Token'}
                    onChangeText={handleCommonChange('token')}
                />

                <CTextArea
                    label='Code Content'
                    value={inputFields.content}
                    onChangeText={handleCommonChange('content')}
                    className='mt-4'
                />
                <div className='flex-center flex'>
                    <CButton
                        isLoading={isFetching}
                        variant={BtnVariant.Solid}
                        onPress={handleSubmit}
                    >
                        Check Code
                    </CButton>
                </div>
            </div>
            <div className='col-2'>
                {responseData?.map((item, index) => {
                    const { response } = item;
                    const { is_eligible, metadata, ineligible_reason } = response || {};
                    return (
                        <Fragment key={index}>
                            <div
                                key={index}
                                className={clsx('row-2', {
                                    'text-red': !is_eligible,
                                })}
                            >
                                {item.item.url} | {item.item.promoCode} |{' '}
                                {metadata?.summary || ineligible_reason?.title}
                            </div>
                            <CLine />
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default CheckCodePage;
