import { Task, TaskQueue } from '@grupakmk/libstorefront';
export declare class PayuDao {
    private taskQueue;
    getPayuUrl(orderId: string): Promise<Task>;
    getPayuPaymentStatus(orderId: string): Promise<Task>;
    constructor(taskQueue: TaskQueue);
}
