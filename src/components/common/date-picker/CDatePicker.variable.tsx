export const DatePickerClassNames = {
    headerWrapper: 'pt-4 bg-background',
    prevButton: 'border-1 border-default-200 rounded-small',
    nextButton: 'border-1 border-default-200 rounded-small',
    gridHeader: 'bg-background shadow-none border-b-1 border-default-100',
    selectorButton: '!outline-0 !outline-offset-0 data-[focus-visible=true]:bg-primary/10',
    cellButton: [
        // 'data-[today=true]:bg-default-100 data-[selected=true]:bg-transparent rounded-small',
        // start (pseudo)
        'data-[range-start=true]:before:rounded-l-small',
        'data-[selection-start=true]:before:rounded-l-small',
        // end (pseudo)
        'data-[range-end=true]:before:rounded-r-small',
        'data-[selection-end=true]:before:rounded-r-small',
        // start (selected)
        'data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:rounded-small',
        // end (selected)
        'data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:rounded-small',
        'data-[selected=true]:rounded-small',
        'data-[hover=true]:rounded-small data-[hover=true]:bg-primary-100',
        '!duration-0',
    ],
};
