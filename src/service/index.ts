import { inject, injectable } from 'inversify';
import { AbstractStore, LibstorefrontInnerState, Task } from '@grupakmk/libstorefront';
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
    public getPayuPaymentForm (orderId: string): Promise<PayuResponse> {
        return this.store.dispatch(PayuThunks.getPayuForm(orderId));
    }

    /**
     * Returns PayU payment status for selected order
     * @param {string} orderId
     * @returns {Promise<PayuStatus>} Payment status
     */
    public getPayuPaymentStatus (orderId: string): Promise<PayuStatus> {
        return this.store.dispatch(PayuThunks.getPayuStatus(orderId));
    }

    /**
     * Sends parsed dotpay form
     */
    public sendPayuForm (): Promise<Task> {
        return this.store.dispatch(PayuThunks.sendPayuForm());
    }
}
