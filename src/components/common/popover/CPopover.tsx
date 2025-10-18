import { Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@heroui/react';
import { cloneDeep } from 'lodash-es';
import { useMemo, useState } from 'react';

import { OptionItem } from '@/types/common.type';

import { NsI18n, useTranslation } from '@/cores/i18n';

import { arrayNotEmpty } from '@/utils/common.util';
import { removeAccents } from '@/utils/string.util';

import IconSearch from '@/assets/icons/common/Search';

import CInput from '../input/CInput';

import { PopoverRenderItem } from './CPopover.type';

type CPopoverProps = {
    options: OptionItem[];
    children?: any;
    nsI18n?: NsI18n;
    renderItem?: PopoverRenderItem;
    onSelect: (item: OptionItem) => void;
    onOpenChange?: (open: boolean) => void;
};

const CPopover = (props: CPopoverProps) => {
    const { nsI18n, options, children, renderItem, onSelect, onOpenChange } = props as CPopoverProps;

    const { t } = useTranslation(nsI18n);

    const { isOpen, onOpenChange: _onOpenChange } = useDisclosure();

    const [keyword, setKeyword] = useState<string>('');

    const searchResults = useMemo(() => {
        const keywordUnsigned: string = removeAccents(keyword).trim();
        const _options: OptionItem[] = cloneDeep(options || []);
        if (!keywordUnsigned || !arrayNotEmpty(_options)) {
            return _options;
        }

        return _options.filter((item) => {
            const { label } = item || {};
            const labelUnsigned = removeAccents(label);
            return labelUnsigned.includes(keywordUnsigned);
        });
    }, [keyword]);

    const handleSelect = (item: OptionItem) => {
        setKeyword('');
        onSelect(item);
        handleOpen(false);
    };

    const handleOpen = (open: boolean) => {
        _onOpenChange();
        onOpenChange?.(open);
    };

    return (
        <Popover
            isOpen={isOpen}
            placement='bottom-start'
            onOpenChange={handleOpen}
        >
            <PopoverTrigger className={'!transform-none !opacity-100'}>{children}</PopoverTrigger>
            <PopoverContent className={'min-w-[240px] max-w-[240px] p-0'}>
                <div className='w-full'>
                    <div className={'px-2 pt-2'}>
                        <CInput
                            className={'w-full'}
                            radius={'full'}
                            size={'sm'}
                            placeholder={t('search') + ` | ${searchResults.length} ${t('value')}`}
                            startContent={<IconSearch size={16} />}
                            value={keyword}
                            onClear={() => setKeyword('')}
                            onChangeText={setKeyword}
                        />
                    </div>
                    {arrayNotEmpty(searchResults) ? (
                        <>
                            <div className={'flex max-h-[300px] flex-col gap-2 overflow-hidden pt-2'}>
                                <div className={'overflow-y-auto px-2 pb-2 scrollbar-hide'}>
                                    <div className={'col-1'}>
                                        {searchResults.map((item) => {
                                            const { value } = item;
                                            return (
                                                <div
                                                    key={value}
                                                    onClick={() => handleSelect(item)}
                                                >
                                                    {renderItem ? renderItem(item) : t(item.label)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='flex min-h-12 w-full justify-center px-2 py-2 opacity-50'>
                            <span className={'opacity'}>{t('noData')}</span>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default CPopover;
