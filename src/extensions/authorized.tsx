import { NsI18n, useTranslation } from '@/cores/i18n';

import DialogExtension from './DialogExtensions';

const AuthorizedExtensions = () => {
    useTranslation(NsI18n.Error);
    return <DialogExtension />;
};

export default AuthorizedExtensions;
