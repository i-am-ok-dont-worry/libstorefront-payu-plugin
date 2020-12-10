import { inject, injectable } from 'inversify';
import {AbstractStore, LibstorefrontInnerState, PaymentMethod, Task} from '@grupakmk/libstorefront';
import { PayuThunks } from '../store/payu.thunks';
import { PayuResponse, PayuStatus } from '../types';

@injectable()
export class PayuService {

    @inject(AbstractStore) private store: AbstractStore<LibstorefrontInnerState>;

    /**
     * Returns PayU form that should be POST send
     * as application/x-www-form-urlencoded form
     * @param {number} orderId
     * @returns {Promise<PayuResponse>} PayU form object
     */
    public preparePayment (orderId: string): Promise<PayuResponse> {
        return this.store.dispatch(PayuThunks.getPayuUrl(orderId));
    }

    /**
     * Returns PayU payment status for selected order
     * @param {string} orderId
     * @returns {Promise<PayuStatus>} Payment status
     */
    public getPaymentStatus (orderId: string): Promise<PayuStatus> {
        return this.store.dispatch(PayuThunks.getPayuStatus(orderId));
    }

    /**
     * Redirects to PayU payment
     */
    public redirectToPaymentViaUrl (): Promise<Task> {
        return this.store.dispatch(PayuThunks.redirectToPaymentViaUrl());
    }

    /**
     * Loads last PayU transaction from cache into the redux store
     */
    public loadLastTransactionFromCache (): Promise<void> {
        return this.store.dispatch(PayuThunks.loadLastPayuTransaction());
    }

    /**
     * Returns true if payment method can be handled by this plugin
     * @param {PaymentMethod} paymentMethod
     * @returns {boolean}
     */
    public canHandleMethod (paymentMethod: PaymentMethod): boolean {
        return ['payu_gateway', 'payu_gateway_card'].includes(paymentMethod.code);
    }
}
