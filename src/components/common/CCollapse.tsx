import clsx from 'clsx';

type CCollapseProps = {
    open: boolean;
    className?: any;
    children: any;
};

const CCollapse = (props: CCollapseProps) => {
    const { open, className, children } = props;
    return (
        <div
            className={clsx('grid overflow-hidden transition-all duration-300 will-change-transform')}
            style={{
                backfaceVisibility: 'hidden',
                gridTemplateRows: open ? '1fr' : '0fr',
            }}
        >
            <div className={clsx('min-h-0 overflow-hidden', className)}>{children}</div>
        </div>
    );
};

export default CCollapse;
