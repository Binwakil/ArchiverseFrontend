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
  window.contract =  new window.nearApi.Contract(
    window.account, 
    CONTRACT_NAME, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['nft_tokens_for_owner', 'nft_is_approved'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['nft_mint', 'nft_transfer', 'nft_approve'],
  })
}; 


// for checking if account is loging
export const isLogging = () => {
    return window.walletConnection.isSignedIn();
}

// for getting signer account
export const getAccount = () => {
    return window.walletConnection.getAccountId();
}

// for loging out user 
export function logout() {
    if (isLogging()) {
        window.walletConnection.signOut();
        window.location.reload();
        // reload page
        //window.location.replace(window.location.origin + window.location.pathname)
    } else {
        alert('the User is already logout');   
    }
}


// for logig in user
export async function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  if (!isLogging()) {
    window.walletConnection.requestSignIn(CONTRACT_NAME);
  } else {
    //let me = await getAccount()
    alert(`already login please as ${getAccount()}`);
  }  
}


// function for getting user near token balance
export async function balances () {
    if (isLogging()) {
        let nearConnection =await window.nearApi.connect(nearConfig);
        const account = await nearConnection.account(getAccount());
        let acc = await account.getAccountBalance();
        return acc;
        } else {
            return false;
        }

}


// function for minting NFT 
export let mintNFT = async (token_id, title, description, media, document) => {
    if (isLogging()) {
        //get user acount as reciever account
        let receiver_id = await getAccount();
        let extra = document
        //metadata object 
        let  metadata = {title, description, media, extra};
        let minting = await window.contract.nft_mint(
          
          {
            token_id, 
            metadata,
            receiver_id
          
          },
          "300000000000000", // attached GAS (optional)
          "7330000000000000000000"
        );
        return minting;
        } else {
            return false;
        }
}


// function to fetch token owned by user
export let yourToken = async() => {
    if (isLogging()) {
        //get user account as account_id account
        let account_id = await getAccount();
        let ownerToken = await window.contract.nft_tokens_for_owner( 
          {
            account_id
        
          }
        );
        return ownerToken;
        } else {
            return false;
        }

}




// function to transfer token other account 

export let transferToken = async ( receiver_id,  token_id) => {
    if (isLogging()) {
        let transfertNft = await window.contract.nft_transfer( 
          {
            receiver_id,
            token_id
          },
          "300000000000000", // attached GAS (optional)
          "1"
        );
        return transfertNft;
        } else {
            return false;
        }
}

// function for approving other account to transfer token on behalf
export let approveAccount = async (token_id, account_id) => {
    if (isLogging()) {
        let approvingotherAccount = await window.contract.nft_approve( 
          {
            token_id,
            account_id
          },
          "300000000000000", // attached GAS (optional)
          "590000000000000000000"
        );
        return approvingotherAccount;
        } else {
            return false;
        }
}

// function to check approving account 
export let  checkapproveAccount = async (token_id, approved_account_id) => {
    if (isLogging()) {
        let checkapproveacc = await window.contract.nft_is_approved( 
          {
            token_id,
            approved_account_id
          }
        );
        return checkapproveacc; 
        } else {
        return false;
        }

}








 





