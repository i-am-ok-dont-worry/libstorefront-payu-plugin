import { PaymentMethod, Task } from '@grupakmk/libstorefront';
import { PayuResponse, PayuStatus } from '../types';
export declare class PayuService {
    private store;
    /**
     * Returns PayU form that should be POST send
     * as application/x-www-form-urlencoded form
     * @param {number} orderId
     * @returns {Promise<PayuResponse>} PayU form object
     */
    preparePayment(orderId: string): Promise<PayuResponse>;
    /**
     * Returns PayU payment status for selected order
     * @param {string} orderId
     * @returns {Promise<PayuStatus>} Payment status
     */
    getPaymentStatus(orderId: string): Promise<PayuStatus>;
    /**
     * Redirects to PayU payment
     */
    redirectToPaymentViaUrl(): Promise<Task>;
    /**
     * Loads last PayU transaction from cache into the redux store
     */
    loadLastTransactionFromCache(): Promise<void>;
    /**
     * Returns true if payment method can be handled by this plugin
     * @param {PaymentMethod} paymentMethod
     * @returns {boolean}
     */
    canHandleMethod(paymentMethod: PaymentMethod): boolean;
}
