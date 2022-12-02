//We epxport all the functions from the ArchiNFT Smart Contract that we will use in the frontend 
import { CONTRACT_NAME, MARKET_CONTRACT_NAME, getConfig } from "./config";

const nearConfig = getConfig('development');


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
        let minting  = await window.walletConnection.account().functionCall({
          contractId: CONTRACT_NAME,
          methodName: "nft_mint",
          args: {
            token_id, 
            metadata,
            gas: "300000000000000",
            receiver_id
          
          },
           // attached GAS (optional)
           attachedDeposit: "73300000000000000000",
    });

    if (minting) {
      alert("Archinft created: ");
    } else {
      alert("nft not created");
    }
    return minting;
    } else {
    return false;
    }


}

//get the number of sales in the contract 
export let getsalescount = async () => {
  let nftTokens = await window.walletConnection
    .account()
    .viewFunction(MARKET_CONTRACT_NAME, "get_supply_sales");
  return nftTokens
  }

//get the records of sales for  a given owner id
export let loadSaleItemsforowner = async () => {
  let nftTokens = await window.walletConnection
    .account()
    .viewFunction(CONTRACT_NAME, "nft_tokens", {
      from_index: "0",
      limit: 64,
    });
 
  let saleTokens = await window.walletConnection
    .account()
    .viewFunction(
      MARKET_CONTRACT_NAME,
      "get_sales_by_owner_id",
      {
        account_id: getAccount(),
        from_index: "0",
        limit: 64,
      }
    );
  
  let sales = [];

  for (let i = 0; i < nftTokens.length; i++) {
    const { token_id } = nftTokens[i];
    let saleToken = saleTokens.find(({ token_id: t }) => t === token_id);
    if (saleToken !== undefined) {
      sales[i] = Object.assign(nftTokens[i], saleToken);
  
    }
  }
  return sales;
};


//get the records of sales for  a given owner id
export let loadCSaleItems = async () => {
  let nftTokens = await window.walletConnection
  .account()
  .viewFunction(CONTRACT_NAME, "nft_tokens", {
    from_index: "0",
    limit: 64,
  });

let saleTokens = await window.walletConnection
  .account()
  .viewFunction(
    MARKET_CONTRACT_NAME,
    "get_sales_by_nft_contract_id",
    {
      nft_contract_id: "nft.wakili.testnet",
      from_index: "0",
      limit: 64,
    }
  );

let sales = [];

for (let i = 0; i < nftTokens.length; i++) {
  const { token_id } = nftTokens[i];
  let saleToken = saleTokens.find(({ token_id: t }) => t === token_id);
  if (saleToken !== undefined) {
    sales[i] = Object.assign(nftTokens[i], saleToken);

  }
}
return sales;
};


// function to fetch token owned by user
export const yourToken = async () => {
  if (isLogging()) {
  let account_id = await getAccount();
  let nftTokens = await window.walletConnection.account()
    .viewFunction(CONTRACT_NAME, "nft_tokens_for_owner", {
      account_id
    });
    return nftTokens;
  } else {
    return false;
}
}
//function to offer 
export let OfferPrice = async (token_id, bid_amount) => {
  await window.walletConnection.account().functionCall({
    contractId: MARKET_CONTRACT_NAME, 
    methodName: "offer",
    args: {
      nft_contract_id: CONTRACT_NAME,
      token_id: token_id
    },
    attachedDeposit: bid_amount,
    gas: "300000000000000",
  })
}

// const OfferPrice = async (token_id) => {
//   await walletConnection.account().functionCall({
//     contractId: nearConfig.marketContractName,
//     methodName: "offer",
//     args: {
//       nft_contract_id: nearConfig.contractName,
//       token_id,
//     },
//     attachedDeposit: parseNearAmount(values.assetBid),
//     gas: nearConfig.GAS,
//   })
// }

//function to Remove ArchiNFT from Sales
export let UpdatePrice = async (token_id, price) => {
  await window.walletConnection.account().functionCall({
    contractId: MARKET_CONTRACT_NAME, methodName: "update_price",
    args: {
        nft_contract_id: CONTRACT_NAME,
        token_id: token_id,
        price: price,
    },
    attachedDeposit: "1000000000000000000000000",
    gas: "300000000000000"
  })
}

//function to Remove ArchiNFT from Sales
export let RevokeSale = async (token_id, account_id) => {
  await window.walletConnection.account().functionCall({
    contractId: CONTRACT_NAME, methodName: "nft_revoke",
    args: {
      token_id,
      account_id,
    },
    attachedDeposit: "1000000000000000000000000",
  })
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

export let storagedeposite = async (account_id) => {
  if (isLogging()) {
      let paystorage = await window.contract.nft_approve( 
        {
          account_id,
        },
        "300000000000000", // attached GAS (optional)
        "1000000000000000000000000"
        //"9330000000000000000000
      );
      return paystorage;
      } else {
          return false;
      }
}

// function for approving other account to transfer token on behalf
export let approveAccount = async (token_id, account_id, msg) => {
    if (isLogging()) {
     // storagedeposite(account_id);
        let approvingotherAccount = await await window.walletConnection.account().functionCall({
          contractId: CONTRACT_NAME,
          methodName: "nft_approve",
          args: {
            token_id,
            account_id,
            msg
          },
         // "300000000000000", // attached GAS (optional)
         attachedDeposit: "1000000000000000000000000",
    });
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








 





