import { ToastContainer, Slide as ToastifySlideTransition } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import DialogExtension from './DialogExtensions';
import OverlaySpinkit from './OverlaySpinkit';

const BasicExtensions = () => {
    return (
        <>
            <OverlaySpinkit />
            <ToastContainer
                draggable
                autoClose={3000}
                theme={'colored'}
                position={'bottom-right'}
                closeOnClick={false}
                pauseOnFocusLoss={false}
                transition={ToastifySlideTransition}
            />
            <DialogExtension />
        </>
    );
};

export default BasicExtensions;
