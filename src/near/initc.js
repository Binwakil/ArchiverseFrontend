//We epxport all the functions from the ArchiNFT Smart Contract that we will use in the frontend 
import { CONTRACT_NAME, getConfig } from "./config";

const nearConfig = getConfig('development');

// Initialize contract & set global variables
export async function initContract () {
  // Initialize connection to the NEAR testnet
  //const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))
  let near = await window.nearApi.connect(nearConfig);
  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new window.nearApi.WalletConnection(near);

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.account = await window.walletConnection.account()
  // Initializing our contract APIs by contract name and configuration
 
}; 
