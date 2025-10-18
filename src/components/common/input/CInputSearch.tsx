import { NsI18n, useTranslation } from '@/cores/i18n';

import IconSearch from '@/assets/icons/common/Search';

import CInput, { CInputProps } from '@/components/common/input/CInput';

type CompProps = {
    nsI18n?: NsI18n;
} & CInputProps;

const CInputSearch = (props: CompProps) => {
    const { nsI18n, ...rest } = props as CompProps;

    const { t } = useTranslation(nsI18n);

    return (
        <CInput
            className={'max-h-[36px] w-full sm:max-w-[44%] md:max-w-[480px]'}
            classNames={{
                inputWrapper: '!max-h-[36px] min-h-[36px]',
            }}
            placeholder={t('search')}
            startContent={<IconSearch />}
            {...rest}
        />
    );
};

export default CInputSearch;
