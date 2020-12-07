import { PayuStatus } from '../types';

export const PayuDefaultState: PayuModuleState = {
    url: null,
    status: PayuStatus.NOT_EXISTS
}

export interface PayuModuleState {
    url: string,
    status: PayuStatus
}
