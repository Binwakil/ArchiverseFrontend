//import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
//import getConfig from './config'


import { MARKET_CONTRACT_NAME, getConfig } from "./config";

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

  window.contract =  new window.nearApi.Contract(
    window.account, 
    MARKET_CONTRACT_NAME, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['nft_tokens_for_owner', 'nft_is_approved'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['nft_mint', 'nft_transfer', 'nft_approve'],
  })
}; 


// function for Updating Price NFT 
export let updatePrice = async (contract_id, token_Id, price) => {
    if (isLogging()) {
        let update_Price = await window.contract.update_price(  
          {
            contract_id, 
            token_Id,
            price
          },
        );
        return update_Price;
    } else {    
        return false;

    }
}









 





