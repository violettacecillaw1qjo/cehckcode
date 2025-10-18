import clsx from 'clsx';
import { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ReactSVG } from 'react-svg';

import ImgError from '@/assets/images/common/img_error.png';

import ClientProvider from './ClientProvider';

type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export type Props = {
    id?: any;
    src: any;
    alt?: string;
    size?: string | number;
    width?: string | number;
    height?: string | number;
    objectFit?: ObjectFit;
    style?: object;
    className?: string;
    // props for SVG
    svg?: boolean; // https://github.com/tanem/react-svg/tree/master/examples/external-stylesheet
    lazyload?: boolean;
    gradient?: {
        colors: any[][];
        x1: string;
        y1: string;
        x2: string;
        y2: string;
    };
    color?: string;
    svgStyle?: object;
    svgSelector?: string;
    onClick?: (e: any) => void;
};

const getSRC = (src: any) => src?.default?.src || src?.src || src?.default || String(src);

const ImageViewer = (props: Props, ref: any) => {
    const {
        alt = '',
        size,
        width,
        height,
        objectFit = 'cover',
        style,
        className,
        src,
        lazyload,
        svg,
        svgStyle,
        svgSelector,
        ...rest
    } = props;

    const [renderAt, setRenderAt] = useState(Date.now());

    const [displaySrc, setDisplaySrc] = useState<string>(getSRC(src));

    useEffect(() => {
        setRenderAt(0);
    }, [displaySrc]);

    useEffect(() => {
        setDisplaySrc(getSRC(src));
    }, [src]);

    const displayClassName = useMemo(() => {
        return clsx(`object-${objectFit}`, className);
    }, [objectFit, svg, svgSelector, svgStyle, className]);

    const handleSvgBeforeInjection = useCallback((svgNode: SVGSVGElement) => {
        const gNode = svgNode.querySelector('g[fill*="#"]');
        if (gNode) {
            gNode.setAttribute('fill', `currentColor`);
        }
        return svgNode.setAttribute('style', 'height:100%');
    }, []);

    const handleSvgAfterInjection = () => {
        if (!renderAt) setRenderAt(Date.now());
    };

    const handleError = () => {
        setDisplaySrc(getSRC(ImgError));
    };

    const displayProps = useMemo(
        () => ({
            ref,
            style: {
                ...style,
                width: size ?? width ?? 20,
                height: size ?? height ?? 20,
            },
            ...rest,
            src: displaySrc,
            className: displayClassName,
            ['data-render-at']: renderAt,
            ...(!svg &&
                lazyload && {
                    onError: handleError,
                }),
        }),
        [style, size, width, height, displaySrc, displayClassName, renderAt, lazyload],
    );

    return (
        <ClientProvider>
            {svg ? (
                <ReactSVG
                    {...displayProps}
                    beforeInjection={handleSvgBeforeInjection}
                    afterInjection={handleSvgAfterInjection}
                    style={{ ...svgStyle }}
                    className={clsx(displayClassName, svgSelector)}
                />
            ) : (
                <img
                    alt={alt}
                    {...displayProps}
                />
            )}
        </ClientProvider>
    );
};

export default memo(forwardRef(ImageViewer));
