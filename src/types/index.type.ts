import type { FC, SVGProps } from 'react';

import { NextPage } from 'next';

declare module '*.svg' {
    export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};
