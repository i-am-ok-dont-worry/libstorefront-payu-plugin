import { Reducer } from '@grupakmk/libstorefront/dist/src/state-management/types/reducer';
import { AnyAction } from '@grupakmk/libstorefront/dist/src/state-management/types/action';
import { PayuDefaultState, PayuModuleState } from './payu.default';
import { PayuActions } from './payu.actions';

export const payuReducer: Reducer<PayuModuleState, AnyAction> = (state = PayuDefaultState, action) => {
    switch (action.type) {
        case PayuActions.SET_PAYU_STATUS: {
            return { ...state, status: action.payload };
        }
        case PayuActions.SET_PAYU_URL: {
            return { ...state, url: action.payload };
        }
        default: return state || PayuDefaultState;
    }
};
