import { PayuStatus } from '../types';
export declare namespace PayuActions {
    const SN_PAYU = "payu";
    const SET_PAYU_URL: string;
    const setPayuUrl: (url: string) => {
        type: string;
        payload: string;
    };
    const SET_PAYU_STATUS: string;
    const setPayuStatus: (status: PayuStatus) => {
        type: string;
        payload: PayuStatus;
    };
    const SET_PAYU_ORDER_NUMBER: string;
    const setDotpayOrderNumber: (orderNumber: string) => {
        type: string;
        payload: string;
    };
}
