import clsx from 'clsx';
import React, { DragEventHandler, MouseEventHandler, useCallback, useEffect, useState } from 'react';

import { preventDefaultClickEvent } from '@/utils/dom.util';

type CFileDropZoneProps = {
    children: React.ReactNode;
    className?: string;
    onDrop: (files: File[]) => void;
    onClick?: MouseEventHandler<HTMLDivElement>;
};

const CFileDropZone = (props: CFileDropZoneProps) => {
    const { className, children, onDrop, onClick } = props;

    const [isDragging, setIsDragging] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = useCallback(
        (type: 'container' | 'body'): DragEventHandler<HTMLDivElement> =>
            (e) => {
                preventDefaultClickEvent(e as unknown as Event);

                setIsDragging(true);

                if (type !== 'container') return;
                setIsDragOver(true);
            },
        [],
    );

    const handleDragLeave = useCallback((e: DragEvent) => {
        preventDefaultClickEvent(e as unknown as Event);

        setIsDragging(false);
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(
        (type: 'container' | 'body'): DragEventHandler<HTMLDivElement> =>
            (e) => {
                preventDefaultClickEvent(e as unknown as Event);

                setIsDragging(false);
                setIsDragOver(false);
                if (type !== 'container') return;

                const transferredFiles = Array.from(e.dataTransfer.files);
                if (!transferredFiles.length) return;
                onDrop(transferredFiles);
            },
        [onDrop],
    );

    useEffect(() => {
        const handleWindowDragOver = (e: DragEvent) => handleDragOver('body')(e as any);

        window.addEventListener('dragover', handleWindowDragOver);
        window.addEventListener('dragleave', handleDragLeave);
        window.addEventListener('drop', handleDrop('body') as unknown as EventListener);

        return () => {
            window.removeEventListener('dragover', handleWindowDragOver);
            window.removeEventListener('dragleave', handleDragLeave);
            window.removeEventListener('drop', handleDrop('body') as unknown as EventListener);
        };
    }, []);

    return (
        <div
            className={clsx(className, {
                'border-dashed': isDragging,
                'border-blue bg-blue/10': isDragOver,
            })}
            onDragOver={handleDragOver('container')}
            onDragLeave={handleDragLeave as unknown as DragEventHandler<HTMLDivElement>}
            onDrop={handleDrop('container')}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default CFileDropZone;
