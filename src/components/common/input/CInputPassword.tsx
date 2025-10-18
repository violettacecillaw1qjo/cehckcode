import { useState } from 'react';

import { useTranslation } from '@/cores/i18n';

import IconEyeClosed from '@/assets/icons/common/EyeClosed';
import IconEyeOpen from '@/assets/icons/common/EyeOpen';

import CInput, { CInputProps } from '@/components/common/input/CInput';

type Props = {} & CInputProps;

const CInputPassword = (props: Props) => {
    const { ...rest } = props;

    const { t, j } = useTranslation();
    const [show, setShow] = useState<boolean>(false);

    return (
        <CInput
            isPassword
            label={t('password')}
            type={show ? 'text' : 'password'}
            placeholder={j('enter', ['password', { t: 'l' }])}
            endContent={
                <button
                    className={'focus:outline-none'}
                    type={'button'}
                    onClick={() => setShow(!show)}
                >
                    <div>{show ? <IconEyeOpen /> : <IconEyeClosed />}</div>
                </button>
            }
            {...rest}
        />
    );
};

export default CInputPassword;
