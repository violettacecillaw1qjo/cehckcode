import clsx from 'clsx';
import { Fragment } from 'react';

import { NsI18n, useTranslation } from '@/cores/i18n';

import { arrayNotEmpty } from '@/utils/common.util';

import { TabLabelItem } from './CTabLabel.type';

type CTabLabelProps = {
    tabIdx?: number;
    tabId?: string;
    tabs: TabLabelItem[];
    nsI18n?: NsI18n;
    onChange?: (tabIdx: number, tab: TabLabelItem) => void;
};

const CTabLabel = (props: CTabLabelProps) => {
    const { nsI18n, tabIdx, tabId, tabs, onChange } = props;

    const { t } = useTranslation(nsI18n);

    if (!arrayNotEmpty(tabs)) return null;

    return (
        <div className={'row-2'}>
            {tabs.map((item: TabLabelItem, idx: number) => {
                const { label, value, count } = item;
                const isActive: boolean = idx === tabIdx || tabId === value;
                return (
                    <Fragment key={value}>
                        <b
                            className={clsx('cursor-pointer select-none text-tiny font-black', {
                                'opacity-50': !isActive,
                            })}
                            onClick={() => {
                                onChange?.(idx, item);
                            }}
                        >{`${t(label)}${count ? ` (${0})` : ''}`}</b>
                        {idx + 1 < tabs.length && <span className={'text-tiny opacity-50'}>{'|'}</span>}
                    </Fragment>
                );
            })}
        </div>
    );
};

export default CTabLabel;
