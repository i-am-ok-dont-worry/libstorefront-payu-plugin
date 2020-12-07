import { PayuStatus } from '../types';
export declare const PayuDefaultState: PayuModuleState;
export interface PayuModuleState {
    url: string;
    status: PayuStatus;
    orderNumber: string;
}
