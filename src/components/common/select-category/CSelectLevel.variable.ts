import clsx from 'clsx';

export const DEFAULT_WIDTH: number = 240;
export const DEFAULT_HEIGHT: number = 256;

export const DefaultItemClasses = clsx(
    'cursor-pointer select-none rounded-xl px-4 py-2',
    'flex items-center gap-2',
    '[&:not(:first-child)]:mt-1',
    'hover:bg-primary/10',
);

export const SelectedItemClasses = 'bg-success/10 text-success hover:bg-success/10';
