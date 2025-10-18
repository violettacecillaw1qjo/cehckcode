import { ReactNode } from 'react';

type CTitleProps = {
    title: ReactNode;
    description: ReactNode;
};

const CTitle = (props: CTitleProps) => {
    const { title, description } = props;
    return (
        <div className='flex flex-col gap-1'>
            <b className={'text-medium text-primary'}>{title}</b>
            <span className='text-tiny opacity-50'>{description}</span>
        </div>
    );
};

export default CTitle;
