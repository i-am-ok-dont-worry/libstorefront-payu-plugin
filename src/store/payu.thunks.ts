import { PayuDao } from '../dao';
import { PayuActions } from './payu.actions';
import {
    AbstractStore,
    ConnectionState,
    IOCContainer,
    Logger,
    StorageCollection,
    StorageManager
} from '@grupakmk/libstorefront';
import { PayuStatus } from '../types';
import { PayuModuleState } from './payu.default';

export namespace PayuThunks {
    // @ts-ignore
    export const getPayuUrl = (orderId: string) => async (dispatch, getState) => {
        try {
            const response = await IOCContainer.get(PayuDao).getPayuUrl(orderId);

            if (typeof response.result === 'string') {
                const url = response.result;
                StorageManager.getInstance().get(StorageCollection.ORDERS).setItem('last_payu_payment', { url, status: PayuStatus.NOT_EXISTS });
                dispatch(PayuActions.setPayuUrl(url));
                dispatch(PayuActions.setPayuStatus(PayuStatus.NOT_EXISTS));
                return { url, status: PayuStatus.NOT_EXISTS };
            }
        } catch (e) {
            return null;
        }
    };

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
    };

    export const redirectToPaymentViaUrl = () => async (dispatch, getState) => {
        try {
            if (ConnectionState.isServer()) { throw new Error(`Cannot use payu plugin on server`); }

            dispatch(PayuActions.setPayuStatus(PayuStatus.PENDING));
            const payu = (IOCContainer.get(AbstractStore).getState().payu as PayuModuleState);
            window.location.href = payu.url;
        } catch (e) {
            Logger.warn(`PayU error: `, e);
            dispatch(PayuActions.setPayuStatus(PayuStatus.ERROR));
        }
    };

    export const loadLastPayuTransaction = () => async (dispatch, getState) => {
        try {
            const lastPayuPayment: PayuModuleState = await StorageManager.getInstance().get(StorageCollection.ORDERS).getItem('last_payu_payment');
            if (!lastPayuPayment) { return; }
            dispatch(PayuActions.setPayuUrl(lastPayuPayment.url));
            dispatch(PayuActions.setPayuStatus(lastPayuPayment.status));
        } catch (e) {}
    }
}
