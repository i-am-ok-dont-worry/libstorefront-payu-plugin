import { PayuDao } from '../dao';
import { PayuActions } from './payu.actions';
import { AbstractStore, IOCContainer, LibstorefrontInnerState } from '@grupakmk/libstorefront';
import { StorageManager, StorageCollection } from '@grupakmk/libstorefront';
import { PayuResponse, PayuStatus } from '../types';
import { PayuModuleState } from './payu.default';

export namespace PayuThunks {
    // @ts-ignore
    export const getPayuForm = (orderId: string) => async (dispatch, getState) => {
        try {
            const response = await IOCContainer.get(PayuDao).getPayuForm(orderId);
            let dotpay: PayuResponse;
            if (response.result instanceof Array) {
                const [data] = response.result;
                if (data && data.hasOwnProperty('url')) { dotpay = data; }
            } else {
                if (response.result && response.result.hasOwnProperty('url')) { dotpay = response.result; }
            }

            StorageManager.getInstance().get(StorageCollection.ORDERS).setItem('last_payu_payment', dotpay);
            dispatch(PayuActions.setPayuForm(dotpay.data));
            dispatch(PayuActions.setPayuUrl(dotpay.url));
            return dotpay;
        } catch (e) {
            return null;
        }
    }

    // @ts-ignore
    export const getPayuStatus = (orderId: string) => async (dispatch, getState) => {
        try {
            const response = await IOCContainer.get(PayuDao).getPayuPaymentStatus(orderId);
            await dispatch(PayuActions.setPayuStatus(response.result));
            return response.result as PayuStatus;
        } catch (e) {
            console.warn('Error while fetching status: ', e);
            return null;
        }
    }

    export const sendPayuForm = () => async (dispatch, getState) => {
        const orderNumber = (IOCContainer.get(AbstractStore).getState() as LibstorefrontInnerState).order.last_order_confirmation.confirmation.orderNumber;
        const trackStatus = (orderNumber) => {
            const interval = setInterval(async () => {
                const status = await dispatch(getPayuStatus(orderNumber));
                if (status === PayuStatus.SUCCESS) { clearInterval(interval); }
            }, 5000);
        };

        try {
            const dotpay = IOCContainer.get(AbstractStore).getState().dotpay as PayuModuleState;
            const { form, url } = dotpay;
            await IOCContainer.get(PayuDao).sendPayuInformationForm(url, form);
            trackStatus(orderNumber);
        } catch (e) {
            trackStatus(orderNumber);
        }
    }
}
