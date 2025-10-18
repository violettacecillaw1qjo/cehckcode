import { PropsWithChildren, useEffect, useState } from 'react';

type ClientProviderProps = PropsWithChildren<{
    fallback?: React.ReactNode;
}>;

const ClientProvider = ({ children, fallback }: ClientProviderProps) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient ? children : (fallback ?? <></>);
};

export default ClientProvider;
