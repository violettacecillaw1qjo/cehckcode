import { Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@heroui/react';
import clsx from 'clsx';
import { cloneDeep, isArray, isEmpty } from 'lodash-es';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useResizeObserver } from 'usehooks-ts';

import { useTranslation } from '@/cores/i18n';

import { arrayNotEmpty } from '@/utils/common.util';
import { removeAccents } from '@/utils/string.util';

import IconChevronDown from '@/assets/icons/common/ChevronDown';
import IconSearch from '@/assets/icons/common/Search';

import FieldInput from '@/components/common/input/CInput';

import CButton from '../button/CButton';
import { BtnVariant } from '../button/CButton.type';

import { SelectCategoryItem, SelectCategoryOption, Size } from './CSelectLevel.type';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, DefaultItemClasses, SelectedItemClasses } from './CSelectLevel.variable';

type CSelectLevelProps = {
    required?: boolean;
    isInvalid?: boolean;
    notCloseOnSelect?: boolean;
    hide?: boolean;
    label?: string;
    value?: SelectCategoryItem | null;
    options?: SelectCategoryItem[] | null;
    onChange?: (value: SelectCategoryItem | null) => void;
};

const CSelectLevel = (props: CSelectLevelProps) => {
    const { isInvalid, required, notCloseOnSelect, label, value, options, onChange } = props;

    const { t } = useTranslation();

    const wrapperRef = useRef<HTMLDivElement>(null);

    const { isOpen, onOpenChange, onClose } = useDisclosure();

    const [keyword, setKeyword] = useState<string>('');
    const [width, setWidth] = useState<number>(DEFAULT_WIDTH);

    useEffect(() => {
        if (wrapperRef.current) {
            const { width: _width } = wrapperRef.current.getBoundingClientRect();
            handleResize({ width: _width });
        }
    }, []);

    const handleResize = (size: Size) => {
        const { width: _width } = size;
        if (_width) {
            setWidth(_width);
        }
    };

    useResizeObserver({
        ref: wrapperRef as any,
        onResize: handleResize,
    });

    const menus = useMemo<SelectCategoryOption[]>(() => {
        if (!arrayNotEmpty(options)) return [];
        const parentChilds: Record<string, SelectCategoryOption[]> = {};
        const parentOptions: SelectCategoryOption[] = options.reduce(
            (rs: SelectCategoryOption[], item: SelectCategoryItem, index: number) => {
                const { parentId } = item;
                if (!parentId) {
                    rs.push(item);
                } else {
                    if (!parentChilds[parentId]) {
                        parentChilds[parentId] = [];
                    }
                    parentChilds[parentId].push(item);
                }
                if (index + 1 === options.length) {
                    const list: SelectCategoryOption[] = rs
                        .map((i: SelectCategoryItem) => {
                            return { ...i, childs: parentChilds[i.value] };
                        })
                        .flat();
                    rs = list;
                }
                return rs;
            },
            [],
        );

        return parentOptions;
    }, [options]);

    const checkValidSearch = (label: string): boolean => {
        const keywordUnsigned = removeAccents(keyword).trim();
        if (!keywordUnsigned) return true;
        const labelUnsigned = removeAccents(t(label));
        return labelUnsigned.includes(keywordUnsigned);
    };

    const searchResults = useMemo<SelectCategoryOption[]>(() => {
        let searchResults: SelectCategoryOption[] = [];
        const keywordUnsigned = removeAccents(keyword).trim();
        if (arrayNotEmpty(menus)) {
            searchResults = cloneDeep(menus);
            if (keywordUnsigned) {
                searchResults = searchResults.reduce((result: SelectCategoryOption[], item: SelectCategoryOption) => {
                    const { label, childs } = item;
                    let isValid: boolean = checkValidSearch(label);
                    if (arrayNotEmpty(childs)) {
                        item.childs = childs.filter((i: SelectCategoryOption) => checkValidSearch(i.label));
                        isValid = arrayNotEmpty(item.childs);
                    }
                    if (isValid) {
                        result.push(item);
                    }

                    return result;
                }, []);
            }
        }
        return searchResults;
    }, [menus, keyword]);

    const handleChange = (item: SelectCategoryOption) => {
        const { childs } = item;
        if (arrayNotEmpty(childs)) return;
        const _item: SelectCategoryOption = cloneDeep(item);
        delete _item.childs;
        onChange?.(_item);
        if (!notCloseOnSelect) {
            onClose();
        }
    };

    return (
        <Popover
            isOpen={isOpen}
            placement={'bottom-start'}
            onOpenChange={onOpenChange}
        >
            <div
                ref={wrapperRef}
                className={'col-2 w-full'}
            >
                {label && (
                    <b
                        className={clsx('font-bold subpixel-antialiased', {
                            "after:ms-0.5 after:pl-[2px] after:text-danger after:content-['*']": required,
                            'text-danger': isInvalid,
                        })}
                    >
                        {label}
                    </b>
                )}
                <PopoverTrigger className={'!transform-none !opacity-100'}>
                    <div
                        className={clsx(
                            'row-4 max-h-[40px] min-h-[40px] cursor-pointer items-center pl-4 pr-2',
                            'rounded-2xl border-1 border-primary/10 bg-primary/2 text-primary',
                            'transform transition-all duration-200 ease-out hover:border-primary/10 hover:bg-primary/10',
                            {
                                'border-danger/10 bg-danger/10 focus-within:border-danger hover:border-danger hover:bg-danger/10':
                                    isInvalid,
                            },
                        )}
                    >
                        <div className={'flex-1'}>
                            {value ? (
                                <span>{t(value.label)}</span>
                            ) : (
                                <span className={'opacity-50'}>{t('selectOption')}</span>
                            )}
                        </div>
                        <CButton
                            variant={BtnVariant.Light}
                            className={
                                'flex-center max-h-[32px] min-h-[32px] min-w-[32px] max-w-[32px] rounded-full p-0 hover:!bg-primary/2'
                            }
                            onPress={onOpenChange}
                        >
                            <IconChevronDown
                                size={12}
                                className={clsx(
                                    'transform transition-all duration-200 ease-out',
                                    isOpen ? 'rotate-180' : '',
                                )}
                            />
                        </CButton>
                    </div>
                </PopoverTrigger>
            </div>
            <PopoverContent className={'w-full p-0'}>
                <div
                    className='w-[100%]'
                    style={{
                        minWidth: width,
                        maxWidth: width,
                    }}
                >
                    <div className={'p-2'}>
                        <FieldInput
                            className={'w-full'}
                            radius={'full'}
                            size={'sm'}
                            placeholder={t('search') + ` | ${searchResults.length} ${t('value')}`}
                            startContent={<IconSearch size={16} />}
                            value={keyword}
                            onClear={() => setKeyword('')}
                            onChangeText={setKeyword}
                            // onEnter={() => onSearch?.(keyword)}
                        />
                    </div>
                    {isArray(searchResults) && !isEmpty(searchResults) ? (
                        <>
                            <div
                                className={'flex flex-col gap-2 overflow-auto scrollbar-hide'}
                                style={{
                                    maxHeight: DEFAULT_HEIGHT,
                                    minHeight: DEFAULT_HEIGHT,
                                }}
                            >
                                <div className={'px-2 pb-2'}>
                                    {searchResults.map((item: SelectCategoryOption) => {
                                        const { value: _value, label, childs } = item || {};
                                        const isSelected: boolean = value?.value === _value;
                                        return (
                                            <>
                                                <div
                                                    key={_value}
                                                    className={clsx(DefaultItemClasses, {
                                                        [SelectedItemClasses]: isSelected,
                                                        ['!cursor-default hover:bg-transparent']: arrayNotEmpty(childs),
                                                    })}
                                                    onClick={() => handleChange(item)}
                                                >
                                                    <b>{t(label)}</b>
                                                </div>
                                                {arrayNotEmpty(childs) && (
                                                    <>
                                                        {childs.map((child: SelectCategoryItem) => {
                                                            const { value: childValue, label: childLbl } = child;
                                                            return (
                                                                <div
                                                                    key={childValue}
                                                                    className={clsx(DefaultItemClasses, 'pl-8', {
                                                                        [SelectedItemClasses]:
                                                                            childValue === value?.value,
                                                                    })}
                                                                    onClick={() => handleChange(child)}
                                                                >
                                                                    <b>{t(childLbl)}</b>
                                                                </div>
                                                            );
                                                        })}
                                                    </>
                                                )}
                                            </>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='flex min-h-12 w-[100%] justify-center p-2 opacity-50'>
                            <span className={'opacity'}>{t('noData')}</span>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default CSelectLevel;
