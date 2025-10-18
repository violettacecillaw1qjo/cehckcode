import { transparentize } from 'color2k';
import { cloneDeep, countBy, floor, isNumber, maxBy, toPairs } from 'lodash-es';
import { CSSProperties } from 'react';

import { BookingPaymentLogStatus, BookingPaymentMethod, BookingStatus, DiscountSharing } from '@/enums/booking.enum';
import { CategoryType } from '@/enums/classify.enum';
import { CostType, Percent } from '@/enums/common.enum';
import { DateFormat } from '@/enums/date.enum';
import { TimeRangeShiftType } from '@/enums/work-shift.enum';

import {
    BookingAppt,
    BookingApptAssignee,
    BookingApptCartDiscount,
    BookingApptCartDiscountDetail,
    BookingApptCreator,
    BookingApptCustomer,
    BookingApptPayment,
    BookingApptPaymentItem,
    BookingApptPaymentItemCash,
    BookingApptService,
    BookingApptTip,
    BookingDetailAddBody,
    BookingDetailDto,
    BookingDto,
    BookingPaymentLogDto,
    BookingTaxConfig,
    BookingTipDto,
    CalculateItem,
    DataConfigMappingTechBusy,
    DataConfigWorkShiftEmployee,
    DataMappingWorkingTimeService,
    DataWorkingTimeService,
    ParseBookingApptData,
    ServiceDetailDataParsed,
} from '@/types/booking.type';
import { ClassifyData, ServiceDtoOrProductDto } from '@/types/category.type';
import { Employee, EmployeeDayOfWeek, EmployeeDto } from '@/types/employee.type';
import { ServiceDto } from '@/types/service.type';
import { StoreHour } from '@/types/store.type';

import { CART_DISCOUNT_DIVISION_MAXIMUM_TIME } from '@/variables/booking.data';
import { CategoryMappingColor } from '@/variables/category.data';
import { HAFT_HOUR, MILISECOND_OF_MINUTE, MILISECOND_OF_SECOND, ONE_HUNGRED } from '@/variables/common.data';

import { bigDivision, bigMinus, bigPlus, bigTimes } from './big.util';
import { arrayNotEmpty, arrayToObject } from './common.util';
import { addMinutesTz, fromUnixTimeTz, startOfDayTz } from './date-tz.util';
import { getFormatDate } from './date.util';
import { parseEmployeeDetail } from './employee.util';
import { getUploadFileUrl } from './file.util';
import { formatPhoneNumber, randomString } from './string.util';
import { convertColorHex, isHex } from './style.util';

export const bookingFormatPrice = (value: number) => {
    return floor(value, 2);
};

export const bookingCalcPlus = (num1: number, num2: number) => {
    return bookingFormatPrice(bigPlus(num1, num2));
};

export const bookingCalcMinus = (num1: number, num2: number) => {
    return bookingFormatPrice(bigMinus(num1, num2));
};

export const bookingCalcTimes = (num1: number, num2: number) => {
    return bookingFormatPrice(bigTimes(num1, num2));
};

export const bookingCalcDivision = (num1: number, num2: number) => {
    return bookingFormatPrice(bigDivision(num1, num2));
};

export const calculateTip = (tips: BookingApptTip[], price: number, services: BookingApptService[]) => {
    let totalPay = price;
    let tip = 0;

    const serviceAssigneesCost = cloneDeep(services).reduce((rs: Record<string, number>, item: BookingApptService) => {
        const { assignee, cost } = item;
        const { id } = assignee || {};
        const techId: string = id || '';
        if (!techId) return rs;
        const serviceCost: number = bigPlus(cost, Number(rs[techId] || 0));
        rs[techId] = serviceCost;
        return rs;
    }, {});

    const _tips: BookingApptTip[] = tips.map((item) => {
        const totalServiceCost: number = serviceAssigneesCost[item.techId];
        const countTip = calculatePrice(item, totalServiceCost);
        tip = bookingCalcPlus(tip, countTip);
        totalPay = bookingCalcPlus(totalPay, countTip);

        const tipItem: BookingApptTip = {
            ...item,
            cost: countTip,
            totalServiceCost,
        };
        return tipItem;
    });

    if (totalPay < 0) {
        totalPay = 0;
    }

    return {
        totalPay,
        tip,
        tips: _tips,
    };
};

export const recalculateBookingAppt = (payload: BookingAppt): Partial<BookingAppt> => {
    const { cartDiscount, services, tips } = payload;
    let _cartDiscount: BookingApptCartDiscount | null = null;
    let _services: BookingApptService[] = [];
    const datas: ParseBookingApptData = arrayNotEmpty(services)
        ? services?.reduce(
              (rs: any, i, idx: number) => {
                  const { serviceNames } = rs;
                  let { totalPrice, totalDiscount, totalOrgPrice } = rs;
                  const { name, orgPrice, discountType, quantity, isFree, discount } = i;

                  let _price: number = orgPrice;

                  serviceNames.push(name);
                  const orgCost: number = isNumber(orgPrice) && !isFree ? bookingCalcTimes(orgPrice, quantity) : 0;
                  let cost: number = orgCost || 0;
                  if (discount) {
                      switch (discountType) {
                          case CostType.Money:
                              {
                                  const countDiscount = bookingCalcTimes(discount, quantity);
                                  cost = bookingCalcMinus(cost, countDiscount);
                              }
                              break;
                          case CostType.Percent:
                              {
                                  const countDiscount = bookingCalcDivision(discount, ONE_HUNGRED);
                                  cost = bookingCalcMinus(cost, bookingCalcTimes(cost, countDiscount));
                              }
                              break;
                      }
                      _price = bookingCalcDivision(cost, quantity);
                      totalDiscount = bookingCalcPlus(totalDiscount, bookingCalcMinus(orgCost, cost));
                  }
                  if (cost < 0) {
                      cost = 0;
                  }
                  totalPrice = bookingCalcPlus(totalPrice, cost);
                  totalOrgPrice = bookingCalcPlus(totalOrgPrice, orgCost);
                  const discountCost = bookingCalcMinus(orgCost, cost);
                  const service: BookingApptService = {
                      ...i,
                      cost,
                      orgCost,
                      price: _price,
                      discountCost,
                  };
                  _services.push(service as BookingApptService);
                  if (idx + 1 === services.length) {
                      return {
                          price: totalPrice < 0 ? 0 : totalPrice,
                          discount: totalDiscount,
                          orgPrice: totalOrgPrice,
                          serviceName: serviceNames.join(', '),
                      } as ParseBookingApptData;
                  }
                  return {
                      totalPrice,
                      totalDiscount,
                      totalOrgPrice,
                      serviceNames,
                  };
              },
              {
                  totalPrice: 0,
                  totalOrgPrice: 0,
                  totalDiscount: 0,
                  serviceNames: [],
              },
          )
        : {
              price: 0,
              serviceName: '',
              discount: 0,
              orgPrice: 0,
          };

    let { price } = datas;
    const {
        price: _price,
        cartDiscount: cartDis,
        services: __services,
    } = calculateCartDiscount(cartDiscount, price, _services);

    const { totalTax, services: serviceAfterTax } = calculateTax(__services);

    price = _price;
    _cartDiscount = cartDis;
    _services = serviceAfterTax;

    if (price < 0) {
        price = 0;
    }

    const { tip, tips: _tips, totalPay } = calculateTip(tips, price, _services);

    return {
        ...datas,
        price,
        totalPay: bookingCalcPlus(totalPay, totalTax || 0),
        cartDiscount: _cartDiscount,
        services: _services,
        fullAssign: !_services.some((i) => !i.assignee),
        tip,
        tips: _tips,
    };
};

type ParseBookingDetailOptions = {
    technicans: Record<string, Employee>;
    paymentLogs?: Record<string, BookingPaymentLogDto[]>;
};
export const parseBookingDetail = (payload: BookingDto, options: ParseBookingDetailOptions): BookingAppt => {
    const { technicans, paymentLogs } = options;
    const {
        id,
        uniqueId,
        details,
        cname,
        tips,
        tipCards,
        discountCart,
        phoneSuffix,
        avatar,
        cid,
        createdBy,
        scheduleDate,

        status,
        paymentStatus,
        note,
    } = payload;

    let _cartDiscount: BookingApptCartDiscount | null = null;
    let _services: BookingApptService[] = [];
    let customer: BookingApptCustomer | null = null;
    const creator: BookingApptCreator | null = createdBy || null;
    if (cid) {
        customer = {
            phoneNumber: formatPhoneNumber(phoneSuffix),
            id: cid || '',
            name: cname || '',
            avatar: avatar || '',
            phonePrefix: '',
            phoneSuffix: '',
        };
    }

    const datas: ParseBookingApptData = details?.reduce(
        (rs: any, i, idx: number) => {
            const { assigneeIds, assignees, serviceNames } = rs;
            let { totalPrice, totalDiscount, totalOrgPrice, totalDuration } = rs;
            const {
                techId,
                id: serviceId,
                price,
                quantity,
                sconfig,
                pconfig,
                sduration,
                discount,
                name,
                type,
                thumbnail,
            } = i;
            const { isFree } = sconfig || {};
            const isService = type === CategoryType.Service;
            const isProduct = type === CategoryType.Product;

            const _quantity: number = isProduct && isNumber(quantity) ? quantity : 1;

            const config = isService ? sconfig : pconfig;

            const service: Partial<BookingApptService> = {
                type,
                id: serviceId,
                quantity: _quantity,
                isFree: !!isFree,
                discount: 0,
                discountType: CostType.Money,
                duration: sduration,
                cost: 0,
                orgCost: 0,
                price: 0,
                orgPrice: 0,
                name,
                isNew: false,
                discountCost: 0,
                discountSharing: DiscountSharing.OnSalon,
                avatar: thumbnail,
            };

            totalDuration = bigPlus(totalDuration, sduration || 0);
            serviceNames.push(name);

            if (isProduct || isService) {
                Object.assign(service, {
                    taxConfig: {
                        enable: !!config?.isTax,
                        tax: config?.tax,
                    },
                    costAfterTax: 0,
                    tax: 0,
                });
            }

            const orgPrice: number = isNumber(price) && !isFree ? price : 0;
            let _price: number = orgPrice;
            const orgCost: number = bookingCalcTimes(orgPrice, _quantity);

            let cost: number = orgCost;
            if (discount) {
                const { type, value } = discount;
                if (value && isNumber(value)) {
                    switch (type) {
                        case CostType.Money:
                            {
                                const countDiscount = bookingCalcTimes(value, quantity);
                                cost = bookingCalcMinus(cost, countDiscount);
                            }
                            break;
                        case CostType.Percent:
                            {
                                const countDiscount = bookingCalcDivision(value, ONE_HUNGRED);
                                cost = bookingCalcMinus(cost, bookingCalcTimes(cost, countDiscount));
                            }
                            break;
                    }
                }
                _price = bookingCalcDivision(cost, _quantity);
                totalDiscount = bookingCalcPlus(totalDiscount, bookingCalcMinus(orgCost, cost));
                if (cost < 0) {
                    cost = 0;
                }
                Object.assign(service, {
                    discount: value,
                    discountType: type,
                } as Partial<BookingApptService>);
            }

            totalPrice = bookingCalcPlus(totalPrice, cost);
            totalOrgPrice = bookingCalcPlus(totalOrgPrice, orgCost);
            const discountCost = bookingCalcMinus(orgCost, cost);
            Object.assign(service, {
                cost,
                orgCost: orgCost,
                price: _price,
                orgPrice,
                discountCost,
            } as Partial<BookingApptService>);

            if (techId) {
                const tech = technicans[techId];
                if (tech) {
                    const { avatar, fullName, type: techType } = tech;
                    const assignee: BookingApptAssignee = {
                        serviceId,
                        techId,
                        avatar,
                        id: techId,
                        name: fullName,
                        type: techType,
                    };
                    Object.assign(service, {
                        assignee,
                    } as Partial<BookingApptService>);
                    if (!assigneeIds.includes(techId)) {
                        assigneeIds.push(techId);
                        assignees.push(assignee);
                    }
                }
            }
            _services.push(service as BookingApptService);
            if (idx + 1 === details.length) {
                return {
                    assignees,
                    price: totalPrice < 0 ? 0 : totalPrice,
                    discount: totalDiscount,
                    orgPrice: totalOrgPrice,
                    duration: totalDuration,
                } as ParseBookingApptData;
            }
            return {
                assigneeIds,
                assignees,
                totalPrice,
                totalDiscount,
                totalDuration,
                totalOrgPrice,
                serviceNames,
            };
        },
        {
            serviceNames: [],
            assignees: [],
            assigneeIds: [],
            totalPrice: 0,
            totalOrgPrice: 0,
            totalDiscount: 0,
            totalDuration: 0,
        },
    );

    const { assignees } = datas;
    let { price } = datas;
    if (discountCart) {
        const { type, value } = discountCart;
        _cartDiscount = {
            type,
            value: Number(value || 0),
            cost: 0,
            details: _services.map((i) => {
                const { id: serviceId, name, type } = i;
                return {
                    id: serviceId,
                    name,
                    type,
                    cost: 0,
                    percentage: 0,
                };
            }),
        };
    }
    const {
        price: _price,
        cartDiscount: cartDis,
        services: __services,
    } = calculateCartDiscount(_cartDiscount as any, price, _services);

    const { totalTax, services: serviceAfterTax } = calculateTax(__services);

    price = _price;
    _cartDiscount = cartDis;
    _services = serviceAfterTax;

    let totalPay = bookingCalcPlus(price, totalTax);

    let _tip = 0;

    const tipMapping: Record<string, BookingTipDto> = arrayToObject(tips || [], 'techId');

    const tipPaymentCardMapping: Record<string, BookingTipDto> = arrayToObject(tipCards || [], 'techId');

    const serviceAssigneesCost = _services.reduce((rs: Record<string, number>, item: BookingApptService) => {
        const { assignee, cost } = item;
        const { id } = assignee || {};
        const techId: string = id || '';
        if (!techId) return rs;
        const serviceCost: number = bookingCalcPlus(cost, Number(rs[techId] || 0));
        rs[techId] = serviceCost;
        return rs;
    }, {});

    const tipTechIds: string[] = [];
    const _tips: BookingApptTip[] =
        assignees?.reduce((rs: BookingApptTip[], item) => {
            const { techId, name, avatar } = item;
            if (tipTechIds.includes(techId)) return rs;

            const tip: BookingApptTip = genDefaultTip({
                name,
                techId,
                avatar,
            });

            const totalServiceCost: number = serviceAssigneesCost[techId] || 0;
            const currentTip = tipMapping[techId];
            const paymentTip = tipPaymentCardMapping[techId];

            if (currentTip) {
                const { value, type, isCustom } = currentTip;
                const countTip = calculatePrice(currentTip, totalServiceCost);

                const totalTip = countTip + (paymentTip?.value || 0);

                _tip = bookingCalcPlus(_tip, totalTip);
                totalPay = bookingCalcPlus(totalPay, totalTip);

                Object.assign(tip, {
                    value,
                    type,
                    isCustom: !!isCustom,
                    cost: totalTip,
                });
            }
            Object.assign(tip, {
                totalServiceCost,
            } as Partial<BookingTipDto>);

            tipTechIds.push(techId);
            rs.push(tip);
            return rs;
        }, []) || [];

    const BookingAppt: BookingAppt = {
        ...datas,
        cartDiscount: _cartDiscount,
        creator,
        customer,
        fullAssign: !_services.some((i) => !i.assignee),
        fullName: cname || '',
        id,
        status,
        paymentStatus,
        note,
        price,
        scheduleDate,
        scheduleTime: scheduleDate ? getFormatDate(DateFormat.Time, scheduleDate) : '',
        services: _services,
        tip: _tip,
        tips: _tips,
        totalPay,
        totalTax,
        uniqueId,
        payment: null,

        item: payload,
    };
    Object.assign(BookingAppt, genPaymentItems(BookingAppt, { paymentLogs }));

    return BookingAppt;
};

export const genPaymentItems = (booking: BookingAppt, options?: Partial<ParseBookingDetailOptions>) => {
    const { id: bookingId, totalPay, price, tip } = booking;
    const { paymentLogs } = options || {};
    if (!paymentLogs) return;
    const logs: BookingPaymentLogDto[] = paymentLogs[bookingId];
    if (!arrayNotEmpty(logs)) return;
    let hasPaymentNotFinish: boolean = false;
    const serviceAmount: number = price || 0;
    const tipAmount: number = tip || 0;
    const payment: BookingApptPayment = {
        list: [],
        datas: {},
        totalAmount: totalPay || 0,
        paidAmount: 0,
        provisionalAmount: 0,
        serviceAmount,
        tipAmount,
        serviceBalance: serviceAmount,
        tipBalance: tipAmount,
        discount: 0,
        hasWaitingPayment: false,
    };
    logs.forEach((item) => {
        const { paymentType, status } = item;
        hasPaymentNotFinish = hasPaymentNotFinish || status === BookingPaymentLogStatus.Success;
        const _item = genPosPaymentItem(paymentType, payment as BookingApptPayment, {
            log: item,
        });

        payment.serviceBalance = bookingCalcMinus(payment.serviceBalance, _item.serviceAmount);
        payment.tipBalance = bookingCalcMinus(payment.tipBalance, _item.tipAmount);
        payment.list.push(_item.id);
        payment.datas[_item.id] = _item;
    });
    Object.assign(payment, {
        hasPaymentNotFinish,
    });
    return {
        payment: calculatePosPayment(payment),
    };
};

type GenPosPaymentItemOptions = {
    log?: BookingPaymentLogDto;
    isAddNew?: boolean;
};
export const genPosPaymentItem = (
    method: BookingPaymentMethod,
    payment: BookingApptPayment,
    options?: GenPosPaymentItemOptions,
) => {
    const { provisionalAmount, totalAmount } = payment;
    const { log, isAddNew } = options || {};
    const {
        id,
        amount: logAmount,
        amountReceived,
        status,
        code,
        discountCash,
        totalDiscountCash,
        createdDate,
        deviceId,
    } = log || {};
    const isSuccess: boolean = status === BookingPaymentLogStatus.Success;
    const isPending: boolean = status === BookingPaymentLogStatus.Pending;
    const isProcessing: boolean = status === BookingPaymentLogStatus.Processing;
    const item: BookingApptPaymentItem = {
        id: id || randomString(),
        method,
        paid: isSuccess,
        amount: 0,
        serviceAmount: 0,
        tipAmount: 0,
        discount: 0,
        orgAmount: 0,
        paidDate: isSuccess ? createdDate! : null,
    };
    let amount = Number(logAmount || 0);
    if (isAddNew) {
        amount = bookingCalcMinus(totalAmount, provisionalAmount);
    }
    switch (method) {
        case BookingPaymentMethod.Cash:
            {
                const discount = Number(discountCash || 0);
                // if (isAddNew) {
                //     const { discountCash: _discountCash } = useStoreDetailStore.getState().data!;
                //     discount = _discountCash || discount;
                // }
                const cash: BookingApptPaymentItemCash = {
                    price: amount,
                    discount: discount,
                    receivePrice: Number(amountReceived || 0),
                    totalDiscount: log ? Number(totalDiscountCash || 0) : 0,
                };
                item.cash = cash;
            }
            break;
        case BookingPaymentMethod.Giftcard:
            {
                item.giftCard = {
                    amount,
                    code: code || '',
                };
            }
            break;
        case BookingPaymentMethod.Other:
            {
                item.other = {
                    amount,
                };
            }
            break;
        case BookingPaymentMethod.Card: {
            item.card = {
                isProcessing,
                isWaitingPayment: isPending,
                amount,
                deviceId,
                logId: id || '',
            };
        }
    }
    calculatePosPaymentItem(payment, item, {
        isAddNew,
        isInit: !!log,
    });
    return item as BookingApptPaymentItem;
};

export const calculatePosPayment = (payment: BookingApptPayment) => {
    const { list, tipAmount, serviceAmount, datas } = payment;

    let hasWaitingPayment = false;
    let serviceBalance: number = serviceAmount;
    let tipBalance: number = tipAmount;
    let provisionalAmount: number = 0;
    let paidAmount: number = 0;
    let discount: number = 0;

    for (const id of list) {
        const { amount, serviceAmount, tipAmount, paid, discount: _discount } = datas[id];
        provisionalAmount = bookingCalcPlus(provisionalAmount, amount);
        if (paid) {
            paidAmount = bookingCalcPlus(paidAmount, amount);
        } else {
            hasWaitingPayment = true;
        }
        serviceBalance = bookingCalcMinus(serviceBalance, serviceAmount);
        tipBalance = bookingCalcMinus(tipBalance, tipAmount);
        discount = bookingCalcPlus(discount, _discount);
    }
    Object.assign(payment, {
        serviceBalance,
        tipBalance,
        provisionalAmount,
        paidAmount,
        discount,
        hasWaitingPayment,
    });
    return cloneDeep(payment);
};

type CalculatePosPaymentItemOptions = {
    isAddNew?: boolean;
    isUpdate?: boolean;
    isFinishUpdate?: boolean;
    isInit?: boolean;
};
export const calculatePosPaymentItem = (
    payment: BookingApptPayment,
    item: BookingApptPaymentItem,
    options?: CalculatePosPaymentItemOptions,
) => {
    const { isAddNew, isUpdate, isInit, isFinishUpdate } = options || {};
    const { serviceBalance, serviceAmount: paymentServiceAmount, paidAmount, totalAmount } = payment;
    const { method, cash, giftCard, other, card } = item;
    let amount = 0;
    let serviceAmount = 0;
    let tipBalance = 0;
    let discount = 0;

    switch (method) {
        case BookingPaymentMethod.Cash:
            {
                if (!cash) break;
                const { price } = cash;
                let { totalDiscount } = cash;
                amount = Number(price || 0);
                if (!amount) totalDiscount = 0;
                if (serviceBalance && !isInit && amount) {
                    const countDiscount = bookingCalcDivision(cash.discount, ONE_HUNGRED);
                    totalDiscount = bookingCalcTimes(amount, countDiscount);
                    let _servicebalance =
                        paidAmount < paymentServiceAmount ? bookingCalcMinus(paymentServiceAmount, paidAmount) : 0;

                    switch (true) {
                        case !!isFinishUpdate:
                            if (_servicebalance) {
                                if (amount < _servicebalance) {
                                    _servicebalance = amount;
                                }
                                totalDiscount = bookingCalcTimes(_servicebalance, countDiscount);
                                const remainAmount = bookingCalcMinus(totalAmount, paidAmount);
                                if (bookingCalcPlus(amount, totalDiscount) > remainAmount) {
                                    amount = bookingCalcMinus(remainAmount, totalDiscount);
                                }
                                Object.assign(cash, {
                                    price: amount,
                                });
                            } else {
                                totalDiscount = 0;
                            }
                            break;
                        case !!isAddNew:
                            if (_servicebalance > amount) _servicebalance = amount;
                            totalDiscount = bookingCalcTimes(_servicebalance, countDiscount);
                            if (totalDiscount) {
                                amount = bookingCalcMinus(amount, totalDiscount);
                                Object.assign(cash, {
                                    price: amount,
                                });
                            }
                            break;
                        case !!isUpdate:
                            if (_servicebalance > amount) {
                                _servicebalance = amount;
                                totalDiscount = bookingCalcTimes(_servicebalance, countDiscount);
                            } else {
                                totalDiscount = bookingCalcTimes(
                                    amount > _servicebalance ? _servicebalance : amount,
                                    countDiscount,
                                );
                            }
                            break;
                    }
                    if (totalDiscount) {
                        Object.assign(cash, {
                            totalDiscount,
                        });
                    }
                    Object.assign(item, { cash });
                }
                amount = bookingCalcPlus(amount, totalDiscount);
                discount = totalDiscount;
            }
            break;
        case BookingPaymentMethod.Giftcard:
            {
                const { amount: _amount } = giftCard || {};
                amount = Number(_amount || 0);
            }
            break;
        case BookingPaymentMethod.Other:
            {
                const { amount: _amount } = other || {};
                amount = Number(_amount || 0);
            }
            break;
        case BookingPaymentMethod.Card:
            {
                const { amount: _amount } = card || {};
                amount = Number(_amount || 0);
            }
            break;
    }
    if (serviceBalance) {
        serviceAmount = amount;
        if (serviceBalance < amount) {
            serviceAmount = serviceBalance;
        }
    }
    if (serviceAmount < amount) {
        tipBalance = bookingCalcMinus(amount, serviceAmount);
    }

    Object.assign(item, {
        amount,
        serviceAmount,
        tipBalance,
        discount,
        orgAmount: bookingCalcMinus(amount, discount),
    });
    return item as BookingApptPaymentItem;
};

export const genDefaultTip = (tech: {
    techId: string;
    avatar?: string | null;
    name: string;
    totalServiceCost?: number;
}): BookingApptTip => {
    const { techId, avatar, name, totalServiceCost } = tech;
    const tip: BookingApptTip = {
        techId,
        value: 0,
        type: CostType.Money,
        avatar: avatar || '',
        name: name || '',
        isCustom: false,
        cost: 0,
        totalServiceCost: totalServiceCost || 0,
    };
    return tip;
};

export const calculatePrice = (item: CalculateItem, price: number): number => {
    const { type, value } = item;
    let _value: number = value ? Number(value) : 0;
    _value = type === CostType.Percent ? bookingCalcTimes(price, bookingCalcDivision(_value, ONE_HUNGRED)) : _value;
    return bookingFormatPrice(_value);
};

export const calculateTaxItem = <T extends BookingTaxConfig>(cost: number, item: T) => {
    const { enable, tax } = item || {};

    const data: Record<'tax' | 'costAfterTax', number> = {
        tax: 0,
        costAfterTax: cost,
    };

    if (!enable || !tax) return data;
    const { type, value } = tax;

    switch (type) {
        case CostType.Percent:
            data.tax = bookingCalcTimes(cost, bookingCalcDivision(value, Percent.OneHundred));
            data.costAfterTax = bookingCalcPlus(cost, data.tax);
            break;
        case CostType.Money:
            data.tax = value;
            data.costAfterTax = bookingCalcPlus(cost, data.tax);
            break;
        default:
            break;
    }

    return data;
};

export const calculateTax = (services: BookingApptService[]) => {
    return services.reduce<{
        totalTax: number;
        services: BookingApptService[];
    }>(
        (acc, item) => {
            const { cost, type } = item;
            if (type === CategoryType.GiftCard) {
                acc.services.push(item);
                return acc;
            }
            const { taxConfig } = item;

            const { tax, costAfterTax } = calculateTaxItem(cost, taxConfig);

            acc.totalTax += tax;
            acc.services.push({
                ...item,
                tax,
                costAfterTax,
            });
            return acc;
        },
        {
            totalTax: 0,
            services: [],
        },
    );
};

export const calculateCartDiscount = (
    cartDiscount: BookingApptCartDiscount | null,
    price: number,
    services: BookingApptService[],
) => {
    const { value: _value, details, type } = cartDiscount || {};
    if (!cartDiscount || !arrayNotEmpty(details) || !_value) {
        return {
            price,
            cartDiscount,
            services,
        };
    }
    let countDiscount: number = 0;
    const { mappingServices, total } = services.reduce(
        (rs, item) => {
            const { mappingServices } = rs;
            let { total } = rs;
            const { cost, id } = item;
            total = bookingCalcPlus(total, cost || 0);
            (mappingServices as any)[id] = item;
            return { total, mappingServices };
        },
        {
            total: 0,
            mappingServices: {},
        },
    );
    const discountCostServices: Record<string, number> = {};
    let _details: BookingApptCartDiscountDetail[] = details || [];
    let totalDiscount: number = _value || 0;
    const isMoney: boolean = type === CostType.Money;
    if (isMoney) {
        countDiscount = totalDiscount;
    }
    let time: number = 1;
    do {
        let totalCost: number = 0;
        _details = _details.map((item, index: number) => {
            const { id, cost: curCost } = item;
            const _curCost: number = time === 1 ? 0 : curCost || 0;
            const {
                name,
                type: serviceType,
                price,
                quantity,
            } = ((mappingServices as any)[id] || {}) as BookingApptService;
            const isLast: boolean = index + 1 === _details.length;
            const serviceCost: number = price || 0;
            let percentage: number = 0;
            let cost: number = 0;

            if (isMoney) {
                percentage = bookingCalcDivision(serviceCost, total);
                for (let index = 0; index < quantity; index++) {
                    const quantityCost: number = bookingCalcTimes(totalDiscount, percentage);
                    cost = bookingCalcPlus(cost, quantityCost);
                }
                totalCost = bookingCalcPlus(totalCost, cost);
            } else {
                percentage = bookingCalcDivision(totalDiscount, ONE_HUNGRED);
                cost = bookingCalcTimes(serviceCost, percentage);
                countDiscount = bookingCalcPlus(countDiscount, cost);
            }
            if (isMoney) {
                if (isLast) {
                    if (!totalCost) {
                        cost = totalDiscount;
                        totalCost = totalDiscount;
                    }
                    totalDiscount = bookingCalcMinus(totalDiscount, totalCost);
                }
            }
            cost = bookingCalcPlus(cost, _curCost);
            discountCostServices[id] = cost;
            return {
                id,
                name,
                type: serviceType,
                percentage,
                cost: cost,
            };
        });
        time++;
    } while (totalDiscount && type === CostType.Money && time <= CART_DISCOUNT_DIVISION_MAXIMUM_TIME);

    cartDiscount.details = _details;
    countDiscount = calculatePrice(cartDiscount, price);
    price = bookingFormatPrice(bigMinus(price, countDiscount));

    const _services: BookingApptService[] = services.map((item: BookingApptService) => {
        const { id } = item;
        const discountCost: number = discountCostServices[id] || 0;
        item.cost = bookingCalcMinus(item.cost || 0, discountCost);
        return item;
    });

    cartDiscount = {
        ...cartDiscount,
        value: Number(_value),
        cost: countDiscount,
    };
    return {
        price,
        cartDiscount,
        services: _services,
    };
};

export const getNextMinuteSlot = () => {
    const now = new Date();

    const currentMinutes = now.getMinutes();
    const remainder = currentMinutes % HAFT_HOUR;
    const minutesToAdd = remainder === 0 ? HAFT_HOUR : HAFT_HOUR - remainder;

    const nextTime = new Date(now);
    nextTime.setMinutes(nextTime.getMinutes() + minutesToAdd);
    nextTime.setSeconds(0);
    nextTime.setMilliseconds(0);

    return nextTime.getTime();
};

export const calcTotalPriceBooking = (
    details: (BookingDetailAddBody | ServiceDetailDataParsed | BookingDetailDto)[],
    mappingDataServices?: Record<string, ServiceDtoOrProductDto>,
) => {
    const data = details.reduce(
        (
            acc: {
                totalPrice: number;
                totalTime: number;
                servicesName: string[];
            },
            item,
        ) => {
            const { id, name } = item;
            const { type: _type, price: _price, configs: _configs } = mappingDataServices?.[id] || {};

            const type = item.type || _type || CategoryType.Service;

            const configs = 'configs' in item ? item.configs : _configs;

            const price = 'price' in item ? item.price : _price;

            const isProduct = type === CategoryType.Product;

            const serviceDuration = 'serviceDuration' in item ? item.serviceDuration || 0 : item.sduration || 0;

            const serviceName = name || mappingDataServices?.[id]?.name || '';
            if (serviceName && !acc.servicesName.includes(serviceName)) {
                acc.servicesName.push(serviceName);
            }

            acc.totalTime += serviceDuration;

            if (isProduct) {
                acc.totalPrice += Number(price || 0);
            }

            if (!isProduct && configs) {
                const { isFree } = 'isFree' in configs ? configs : {};

                if (!isFree) {
                    acc.totalPrice += Number(price || 0);
                }
            }

            return acc;
        },
        {
            totalPrice: 0,
            totalTime: 0,
            servicesName: [],
        },
    );

    return data;
};

export const calcWorkingTimeService = (
    data: DataWorkingTimeService,
    mapping?: DataMappingWorkingTimeService,
): ServiceDetailDataParsed[] => {
    const { mappingDataServices = {}, mappingDataClassify = {} } = mapping || {};
    const { details = [] } = data;
    const dataMappingService = details.map((detail, index) => {
        const { id, techId, type } = detail;
        const bookingId = randomString(10);

        const service = mappingDataServices[id];
        const classifyId = service?.categoryIds?.at(-1) || '';

        const classify = mappingDataClassify[classifyId];

        const configs =
            type === CategoryType.Product && 'pconfig' in detail
                ? detail.pconfig
                : 'sconfig' in detail
                  ? detail.sconfig
                  : undefined;

        const { serviceDuration, startWorkTime, endWorkTime } = calcWorkingTimeDetailService(data, index);

        return {
            ...detail,
            ...service,
            price: 'price' in detail ? detail.price : service?.price,
            color: classify?.color,
            configs: configs || service?.configs,
            quantity: 1,
            techId: techId || '',
            serviceDuration,
            bookingId,
            classify,
            startWorkTime,
            endWorkTime,
        };
    });

    return dataMappingService;
};

export const calcWorkingTimeDetailService = (data: DataWorkingTimeService, currentIndex: number) => {
    const { scheduleDate, details = [] } = data;

    const currentItem = details[currentIndex];

    const serviceDuration = 'serviceDuration' in currentItem ? currentItem.serviceDuration : currentItem.sduration || 0;

    const totalPrevWorkTime = details.reduce((acc, item, index) => {
        if (index >= currentIndex) return acc;
        const serviceDuration = 'serviceDuration' in item ? item.serviceDuration : item.sduration || 0;
        return acc + serviceDuration;
    }, 0);

    const startWorkTime = totalPrevWorkTime * MILISECOND_OF_MINUTE + (scheduleDate || 0);

    const endWorkTime = startWorkTime + serviceDuration * MILISECOND_OF_MINUTE;
    return {
        ...currentItem,
        serviceDuration,
        startWorkTime,
        endWorkTime,
    };
};

export const getDayStartAndMillisecondsOfDay = (unixTime: number) => {
    const dayStart = +startOfDayTz(fromUnixTimeTz(unixTime / MILISECOND_OF_SECOND));

    const millisecondsOfDay = +fromUnixTimeTz(unixTime / MILISECOND_OF_SECOND) - dayStart;

    return { dayStart, millisecondsOfDay };
};

export const getWorkShiftEmployee = (config: DataConfigWorkShiftEmployee, techId?: string) => {
    const { scheduleDate, dataMappingWorKShift, mappingDataEmployee } = config;
    const { dayStart } = getDayStartAndMillisecondsOfDay(scheduleDate);

    if (!techId) return;

    const dataWorkShift = dataMappingWorKShift[techId];

    if (dataWorkShift) return dataWorkShift;

    const { shift } = mappingDataEmployee[techId] || {};

    const { daysOfWeek = [] } = shift || {};

    const dayOfWeek = getFormatDate(DateFormat.Weekday, dayStart).toUpperCase();

    const findConfigDay = daysOfWeek.find(({ day }) => day === dayOfWeek);

    const { timeRanges = [] } = findConfigDay || {};

    return {
        ...findConfigDay,
        timeRanges,
    };
};
export const checkTechnicianBusy = (item: ServiceDetailDataParsed, config: DataConfigMappingTechBusy) => {
    const { techId, startWorkTime, endWorkTime, bookingId, serviceDuration } = item;
    if (!techId || !serviceDuration) return false;

    const { dataAllDetailService } = config;

    const workShiftEmployee = getWorkShiftEmployee(config, techId);

    if (workShiftEmployee) {
        const { enable, timeRanges = [] } = workShiftEmployee;

        const { millisecondsOfDay: miliStar } = getDayStartAndMillisecondsOfDay(startWorkTime);
        const { millisecondsOfDay: miliEnd } = getDayStartAndMillisecondsOfDay(endWorkTime);

        const isTimeRange = timeRanges.some(({ from, to }) => miliStar >= from && miliEnd <= to);

        const isBusy = !enable || !isTimeRange;

        if (isBusy) return isBusy;
    }

    return dataAllDetailService.some((scheduleGroup) =>
        scheduleGroup.some(
            (schedule) =>
                schedule.techId === techId &&
                schedule.bookingId !== bookingId &&
                startWorkTime < schedule.endWorkTime &&
                schedule.startWorkTime < endWorkTime,
        ),
    );
};

export const checkTimeSlotAvailable = (
    value: number,
    options: {
        minuteReserve: number;
        storeConfig: StoreHour;
        reservedTimes: number[];
        workShiftEmployee?: Omit<EmployeeDayOfWeek, 'day'>;
    },
): boolean => {
    const { storeConfig, workShiftEmployee, reservedTimes, minuteReserve } = options;

    const currentDate = +new Date();

    const valueTime = value - +startOfDayTz(fromUnixTimeTz(value / MILISECOND_OF_SECOND));

    const { enable: enableStore, timeRanges: timeRangesStore = [] } = storeConfig;

    if (value <= +addMinutesTz(currentDate, minuteReserve)) return true;

    if (!enableStore) return true;

    const isStoreTimeAvailable = timeRangesStore.some(({ from, to }) => valueTime >= from && valueTime < to);

    if (!isStoreTimeAvailable) return true;

    if (workShiftEmployee) {
        const { enable: enableEmployee, timeRanges: timeRangeEmployee = [] } = workShiftEmployee || {};

        if (!enableEmployee) return true;

        const isEmployeeTimeAvailable = timeRangeEmployee.some(
            ({ from, to, type }) => valueTime >= from && valueTime < to && type !== TimeRangeShiftType.Off,
        );
        if (!isEmployeeTimeAvailable) return true;
    }

    const isReservedTime = reservedTimes.includes(value);
    if (isReservedTime) return true;

    return false;
};

export const getWorkShiftEmployeeByDay = (
    dayStart: number,
    options: {
        techId?: string;
        dataMappingWorKShift: Record<string, Omit<EmployeeDayOfWeek, 'day'>>;
        mappingDataEmployee: Record<string, EmployeeDto>;
    },
) => {
    const { techId, dataMappingWorKShift, mappingDataEmployee } = options;

    if (!techId) return;

    const dataWorkShift = dataMappingWorKShift[techId];

    if (dataWorkShift) return dataWorkShift;

    const { shift } = mappingDataEmployee[techId] || {};

    const { daysOfWeek = [] } = shift || {};

    const dayOfWeek = getFormatDate(DateFormat.Weekday, dayStart).toUpperCase();

    const findConfigDay = daysOfWeek.find(({ day }) => day === dayOfWeek);

    return findConfigDay;
};

export const parseBookingServiceDetail = (
    payload: BookingDto,
    options?: {
        categories: Record<string, ClassifyData>;
        services: Record<string, ServiceDto>;
        employees: Record<string, EmployeeDto>;
    },
) => {
    const { employees = {}, services = {}, categories = {} } = options || {};

    const { status, details } = payload;
    const isBookingDone = status === BookingStatus.Done;

    const colors: string[] = [];

    const _services: BookingApptService[] = [];

    const datas = details?.reduce(
        (rs: any, i, idx: number) => {
            const { serviceNames, assigneeIds, assignees } = rs;
            let { totalPrice, totalDiscount, totalDuration, totalOrgPrice } = rs;
            const {
                techId,
                id: serviceId,
                price,
                quantity,
                discount,
                sduration,
                pconfig,
                sconfig,
                type,
                name: serviceNameDetail,
                isCustom,
            } = i;
            const { isFree, duration: configDuration, isRequestedPrice } = sconfig || {};
            const { minute } = configDuration || {};

            const isProduct = type === CategoryType.Product;

            const isService = type === CategoryType.Service;

            const config = isService ? sconfig : pconfig;

            const _quantity: number = isProduct && isNumber(quantity) ? quantity : 1;

            const _duration: number = sduration || minute || 0;
            const service: Partial<BookingApptService> = {
                type,
                id: serviceId,
                isCustom,
                quantity: _quantity,
                name: serviceNameDetail,
                isFree: !!isFree,
                isRequestedPrice: !!isRequestedPrice,
                discount: 0,
                discountType: CostType.Money,
                duration: _duration,
                cost: 0,
                orgCost: 0,
                price: 0,
                orgPrice: 0,
                isNew: false,
                discountCost: 0,
                discountSharing: DiscountSharing.OnSalon,
            };

            if (isProduct || isService) {
                Object.assign(service, {
                    taxConfig: {
                        enable: isCustom || !!config?.isTax,
                        tax: config?.tax,
                    },
                    costAfterTax: 0,
                    tax: 0,
                });
            }

            if (serviceId) {
                const curData = services[serviceId];

                if (curData) {
                    const { name, categoryIds, images } = curData;
                    const categoryId: string = categoryIds?.[0] || '';
                    const childCategory = categories[categoryId] || {};

                    const serviceName = isBookingDone ? serviceNameDetail : name;

                    let { color: _color } = childCategory || {};
                    const { parentId } = childCategory || {};

                    if (_color) {
                        _color = convertColorHex(_color);
                        colors.push(_color);
                    }
                    serviceNames.push(
                        `<span ${_color && isHex(_color) ? `style="color:${_color}"` : ''}>${serviceName}</span>`,
                    );

                    Object.assign(service, {
                        name: serviceName,
                        color: _color || '',
                        avatar: arrayNotEmpty(images) ? getUploadFileUrl(images[0]) : '',
                        durationConfig: configDuration,
                        parentCategory: parentId ? categories[parentId] : childCategory,
                    } as Partial<BookingApptService>);
                    totalDuration = bigPlus(totalDuration, _duration);
                }

                if (isCustom && (isProduct || isService)) {
                    const color = CategoryMappingColor[type];
                    if (color) {
                        const _color = convertColorHex(color);
                        colors.push(_color);
                        serviceNames.push(
                            `<span ${isHex(_color) ? `style="color:${_color}"` : ''}>${serviceNameDetail}</span>`,
                        );
                        Object.assign(service, {
                            color: _color,
                        } as Partial<BookingApptService>);
                    }
                }

                if (!curData && !isCustom) {
                    serviceNames.push(`<span>${serviceNameDetail}</span>`);
                }
            }

            const orgPrice: number = isNumber(price) ? price : 0;
            let _price: number = orgPrice;
            const orgCost: number = bookingCalcTimes(orgPrice, _quantity);

            let cost: number = orgCost;
            if (discount) {
                const { type, value } = discount;
                if (value && isNumber(value)) {
                    switch (type) {
                        case CostType.Money:
                            {
                                const countDiscount = bookingCalcTimes(value, quantity);
                                cost = bookingCalcMinus(cost, countDiscount);
                            }
                            break;
                        case CostType.Percent:
                            {
                                const countDiscount = bookingCalcDivision(value, ONE_HUNGRED);
                                cost = bookingCalcMinus(cost, bookingCalcTimes(cost, countDiscount));
                            }
                            break;
                    }
                }
                _price = bookingCalcDivision(cost, _quantity);
                totalDiscount = bookingCalcPlus(totalDiscount, bookingCalcMinus(orgCost, cost));
                if (cost < 0) {
                    cost = 0;
                }
                Object.assign(service, {
                    discount: value,
                    discountType: type,
                } as Partial<BookingApptService>);
            }
            totalPrice = bookingCalcPlus(totalPrice, cost);
            totalOrgPrice = bookingCalcPlus(totalOrgPrice, orgCost);
            const discountCost = bookingCalcMinus(orgCost, cost);
            Object.assign(service, {
                cost,
                orgCost: orgCost,
                price: _price,
                orgPrice,
                discountCost,
            } as Partial<BookingApptService>);

            if (techId) {
                const tech = employees[techId];
                if (tech) {
                    const { avatar, fullName, type: techType } = parseEmployeeDetail(tech);
                    const assignee = {
                        serviceId,
                        techId,
                        avatar,
                        id: techId,
                        name: fullName,
                        type: techType,
                    };
                    Object.assign(service, {
                        assignee,
                    } as Partial<BookingApptService>);
                    if (!assigneeIds.includes(techId)) {
                        assigneeIds.push(techId);
                        assignees.push(assignee);
                    }
                }
            }
            _services.push(service as BookingApptService);
            if (idx + 1 === details.length) {
                return {
                    assignees,
                    price: totalPrice < 0 ? 0 : totalPrice,
                    discount: totalDiscount,
                    orgPrice: totalOrgPrice,
                    serviceName: serviceNames.join(', '),
                    duration: totalDuration,
                };
            }
            return {
                assigneeIds,
                assignees,
                totalPrice,
                totalDiscount,
                totalOrgPrice,
                totalDuration,
                serviceNames,
            };
        },
        {
            serviceNames: [],
            assignees: [],
            assigneeIds: [],
            totalPrice: 0,
            totalOrgPrice: 0,
            totalDiscount: 0,
            totalDuration: 0,
        },
    );

    let colorStyle: CSSProperties | null = null;
    if (arrayNotEmpty(colors)) {
        const fisrtColor: string = colors[0];
        const color: string = maxBy(toPairs(countBy(colors)), ([_, count]) => count)?.[0] || fisrtColor;
        colorStyle = {
            background: transparentize(color, 0.9),
            borderColor: transparentize(color, 0.8),
            color: color,
        };
    }

    return { ...datas, colors, _services, colorStyle };
};
