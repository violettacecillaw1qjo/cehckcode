import { Analytics, getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';

import { FirebaseConfig } from '@/constants/configs';

class FirebaseMgr {
    static instance: FirebaseMgr | null = null;

    static getInstance() {
        if (!FirebaseMgr.instance) FirebaseMgr.instance = new FirebaseMgr();
        return FirebaseMgr.instance;
    }

    static app: FirebaseApp;
    static analytics: Analytics;

    initFirebase = () => {
        if (FirebaseMgr.app) return;

        const app = initializeApp(FirebaseConfig);

        FirebaseMgr.app = app;
        FirebaseMgr.analytics = getAnalytics(app);
    };

    getAnalytics = () => {
        if (!FirebaseMgr.app) this.initFirebase();
        return FirebaseMgr.analytics;
    };
}

export default FirebaseMgr;
