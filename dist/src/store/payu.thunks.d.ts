import { PayuStatus } from '../types';
export declare namespace PayuThunks {
    const getPayuUrl: (orderId: string) => (dispatch: any, getState: any) => Promise<any>;
    const getPayuStatus: (orderId: string) => (dispatch: any, getState: any) => Promise<PayuStatus>;
    const redirectToPaymentViaUrl: () => (dispatch: any, getState: any) => Promise<void>;
    const loadLastPayuTransaction: () => (dispatch: any, getState: any) => Promise<void>;
}
