import FirebaseMgr from '@/cores/firebase';

const IdbInstance = FirebaseMgr.getInstance();

export const initFirebase = () => IdbInstance.initFirebase();

export const getAnalytics = () => IdbInstance.getAnalytics();
