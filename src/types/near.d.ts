import { WalletConnection, Contract } from "near-api-js";

export { };

declare global {
    interface Window {
        walletConnection: WalletConnection;
        accountId: any;
        contract: Contract;
        nearInitPromise: any;
    }
}
