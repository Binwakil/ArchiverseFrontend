import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa"

import { getAccount, isLogging, login, OfferPrice} from"./../near/utils";

export let Bid = ({product}) => {

    let {token_id, metadata, owner_id, sale_conditions} = product;
    let {title, description, media, extra} = metadata;

    let [tokenName, setTokenName] = useState('');
    let [tokenId, setTokenId] = useState('');
    let [tokenDescription, setTokenDescription] = useState('');
    let [tokenImage, setTokenImage] = useState('');
    let [designDoc, setdesignDoc] = useState('');
    let [nftCategory, setNftCategory] = useState('');
    let [tokenprice, setTokenprice] = useState('');
    let [offerPrice, setOfferPrice] = useState('');
    let [ownerid, setownerid] = useState('');
    let [makingoffer, setmakingoffer] = useState(false);
    let account_id = getAccount();


    useEffect(() => {
        setTokenId(token_id);
        setTokenName(title);
        setTokenDescription(description);
        setTokenImage(media);
        setdesignDoc(extra);
        setTokenprice(sale_conditions);
        setownerid(owner_id);
    })
   

    let makeOffer = async () => {
      let price = ""
      price = prompt('Please Enter your Offer Price')
      setOfferPrice(price)
      let sale_conditions = {
        sale_conditions: offerPrice
      };
      setmakingoffer(true);
      let oprice = JSON.stringify(sale_conditions)
      let making_offer = await OfferPrice(tokenId, price+"000000000000000000000000");
      if(making_offer)
      {
      alert("the NFT is approve for listing")
      setmakingoffer(false);
      console.log("Status " +making_offer)
      }

      
  }
  let handleLogin = async () => {
    login()
  }
  return (
    <div className="bids-container-card">
      <div className="card-column1" >
        <div className="bids-card">
          <div className="bids-card-top">
            <p className="bids-title">{tokenName.toUpperCase()}</p>
            <img className="imageclass" src={tokenImage} alt="" />
          </div>
          <div className="nfttextdiv">
            <div className="bids-card-bottom">
              <p><span>{tokenId}</span></p>
              <p>Price : <span>{tokenprice + " "}</span> Near</p>
            </div>
          </div>

          {
            isLogging() ?

            <div>
                {
                  owner_id === account_id ?
                    <div className=" center">
                      <button className='reg-login-writeButton' >You Own this</button>
                    </div>
                    :
                    <div className=" center">
                      <button className='register-writeButton' onClick={() => makeOffer()}>{makingoffer ? 'Buying ........' : 'Buy Archinft'}</button>
                    </div>
                }
              </div>
              :
              <div className=" center">
                <button className='register-writeButton' onClick={() => handleLogin()}>Connect Wallet</button>
              </div>

              
          }
          <div className="bids-card-bottom">
            <p><span>Owner: </span>{owner_id}</p>
          </div>
        </div>
      </div>
    </div>
          
    )
  }