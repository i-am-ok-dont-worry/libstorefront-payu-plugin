import { inject, injectable } from 'inversify';
import { Task, TaskQueue, URLTransform } from '@grupakmk/libstorefront';
import { PayuForm } from '../types';
import { buildPayuPostBody } from '../utils';

@injectable()
export class PayuDao {
    public getPayuForm (orderId: string): Promise<Task> {
        return this.taskQueue.execute({
            url: URLTransform.getAbsoluteApiUrl('/api/vendor/payu/url' + orderId),
            payload: {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors'
            },
            silent: true
        });
    }

    public getPayuPaymentStatus (orderId: string): Promise<Task> {
        return this.taskQueue.execute({
            url: URLTransform.getAbsoluteApiUrl('/api/vendor/payu/status/' + orderId),
            payload: {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors'
            },
            silent: true
        });
    }

    public sendPayuInformationForm (sslUrl: string, form: PayuForm): Promise<Task> {
        return this.taskQueue.execute({
            url: sslUrl,
            payload: {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                mode: 'cors',
                body: buildPayuPostBody(form)
            },
            silent: true
        });
    }

    public constructor(@inject(TaskQueue) private taskQueue: TaskQueue) {}
}
