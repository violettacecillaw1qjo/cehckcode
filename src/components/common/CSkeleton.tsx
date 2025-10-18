import { ReactNode } from 'react';

type CSkeletonProps = {
    isLoading?: boolean;
    fallback: ReactNode;
    children?: ReactNode;
};

const CSkeleton = (props: CSkeletonProps) => {
    const { isLoading, fallback, children } = props;
    return isLoading ? fallback : children;
};

export default CSkeleton;
