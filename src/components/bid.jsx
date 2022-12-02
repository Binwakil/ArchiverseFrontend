import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa"

import { isLogging, OfferPrice } from"./../near/utils";

export let Bid = ({product}) => {

    let {token_id, metadata} = product;
    let {title, description, media, extra} = metadata;

    let [tokenName, setTokenName] = useState('');
    let [tokenId, setTokenId] = useState('');
    let [tokenDescription, setTokenDescription] = useState('');
    let [tokenImage, setTokenImage] = useState('');
    let [designDoc, setdesignDoc] = useState('');
    let [nftCategory, setNftCategory] = useState('');
    let [tokenprice, setTokenprice] = useState('');
    let [offerPrice, setOfferPrice] = useState('');
    let [makingoffer, setmakingoffer] = useState(false);


    useEffect(() => {
        setTokenId(token_id);
        setTokenName(title);
        setTokenDescription(description);
        setTokenImage(media);
        setdesignDoc(extra);
    })
   

    let makeOffer = async () => {
      let price = ""
      price = prompt('Please Enter your Price')
      setOfferPrice(price)
      let sale_conditions = {
        sale_conditions: price
      };
      let account_id = "dev-1669753500828-98611353392250";
      setmakingoffer(true);
      let oprice = JSON.stringify(sale_conditions)
      let making_offer = await OfferPrice(tokenId, oprice);
      if(making_offer)
      {
      alert("the NFT is approve for listing")
      setmakingoffer(false);
      console.log("Status " +making_offer)
      }
  }

    return(
        <div className="bids-container-card">
        <div className="card-column1" >
          <div className="bids-card">
            <div className="bids-card-top">
            <Link to={`/Nftitem/${tokenId}`}>
            <p className="bids-title">{tokenName.toUpperCase()}</p>
            <img className="imageclass" src={tokenImage} alt=""  />
            </Link>
            </div>
           
            <div className="nfttextdiv">
            <div className="bids-card-bottom">
              <p>: <span>{tokenId}</span></p>
              <p><span>{"tokenId"}</span> Near</p><break></break>
            </div>
            </div>
        
          <div className=" center">
          <Link to={`transfer/${tokenId}`}>
            <button className='register-writeButton' onClick={() => makeOffer() }>{makingoffer ? 'Listing ........' : 'Buy Archinft'}</button>
            </Link>
          </div>
          </div>
        </div>
        </div>
    )
}