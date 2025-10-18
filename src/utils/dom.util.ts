export const preventDefaultClickEvent = (e: Event) => {
    e?.stopPropagation?.();
    e?.preventDefault?.();
    e?.stopImmediatePropagation?.();
};
