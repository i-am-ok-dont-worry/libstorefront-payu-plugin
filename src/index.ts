import { createLibstorefrontModule, HookType, LibStorefront } from '@grupakmk/libstorefront';
import { PayuService } from './service';
import { PayuDao } from './dao';
import { payuReducer } from './store/payu.reducer';
import { PayuDefaultState } from './store/payu.default';

/**
 * Libstorefront plugin template
 */
export const PayuPaymentPlugin = ((libstorefront: LibStorefront) => {
    libstorefront.getIOCContainer().bind<PayuService>(PayuService).to(PayuService);
    libstorefront.getIOCContainer().bind<PayuDao>(PayuDao).to(PayuDao);
    libstorefront.listenTo(HookType.AfterCoreModulesRegistered, (lsf: LibStorefront) => {
       lsf.registerModule(createLibstorefrontModule('payu', payuReducer, PayuDefaultState));
    });
});
