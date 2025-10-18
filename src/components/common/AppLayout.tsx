import Link from 'next/link';
import { PropsWithChildren, useEffect } from 'react';

const AppLayout = (props: PropsWithChildren) => {
    useEffect(() => {}, []);
    return (
        <div>
            <div className='row-2 mb-4 border-b p-4 font-bold'>
                <Link href='/a'>trang a</Link> | <Link href='/b'>trang b</Link>
            </div>
            {props.children}
        </div>
    );
};

export default AppLayout;
