import { PayuForm, PayuStatus } from '../types';

export const PayuDefaultState: PayuModuleState = {
    form: null,
    url: null,
    status: PayuStatus.NOT_EXISTS
}

export interface PayuModuleState {
    form: PayuForm,
    url: string,
    status: PayuStatus
}
