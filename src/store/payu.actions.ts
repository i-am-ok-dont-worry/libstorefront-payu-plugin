import { PayuStatus } from '../types';

export namespace PayuActions {
    export const SN_PAYU = 'payu';

    export const SET_PAYU_URL = SN_PAYU + '/SET_URL';
    export const setPayuUrl = (url: string) => ({
        type: SET_PAYU_URL,
        payload: url
    });

    export const SET_PAYU_STATUS = SN_PAYU + '/SET_STATUS';
    export const setPayuStatus = (status: PayuStatus) => ({
        type: SET_PAYU_STATUS,
        payload: status
    });
}
