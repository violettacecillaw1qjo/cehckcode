import { Spinner } from '@heroui/spinner';

const OverlaySpinkit = () => {
    return (
        <div
            id={'overlay-spinkit'}
            className={'fixed inset-0 z-[9999] hidden h-screen w-screen items-center justify-center bg-overlay/50'}
        >
            <Spinner />
        </div>
    );
};

export default OverlaySpinkit;
