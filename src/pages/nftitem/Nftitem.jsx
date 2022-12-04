import React, { useEffect, useState } from "react";
import './nftitem.css'
import creator from '../../assets/Image.png'
import item from '../../assets/item1.png'
import { Link, useParams } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa"
import { isLogging, approveAccount, yourToken } from "./../../near/utils";

import { MARKET_CONTRACT_NAME } from "../../near/config";
const CryptoJS = require('crypto-js');


const Nftitem = ({ product }) => {
  let { token_id } = useParams();

  console.log("MY ID " + token_id)

  let [tokenName, setTokenName] = useState('');
  let [tokenId, setTokenId] = useState('');
  let [tokenDescription, setTokenDescription] = useState('');
  let [tokenImage, setTokenImage] = useState('');
  let [salePrice, setSalePrice] = useState('');
  let [designdoc, setdesigndoc] = useState('');
  let [approving, setapproving] = useState(false);

  // function to get approved token metadata
  let tokemmetadata = async () => {
    let tokens_metadata = await yourToken();
    let approve_token = tokens_metadata.filter((token) => {
      return (token.token_id == token_id);
    })


    setTokenName(approve_token[0].metadata.title);
    setTokenDescription(approve_token[0].metadata.description);
    setTokenImage(approve_token[0].metadata.media);
    setTokenId(token_id)
    setdesigndoc(approve_token[0].metadata.extra)

  }

  const decryptDoc = (data) => {
    return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
  };
  useEffect(() => {
    tokemmetadata();
  })



  let approveListing = async () => {
    let price = ""
    price = prompt('Please Enter your Price')
    setSalePrice(price)
    let sale_conditions = {
      sale_conditions: price
    };
    let account_id = "dev-1669753500828-98611353392250";
    setapproving(true);
    let msg = JSON.stringify(sale_conditions)
    let approving_account = await approveAccount(token_id, account_id, msg);
    if (approving_account) {
      alert("The NFT is approve for listing")
      setapproving(false);
      console.log("Status " + approving)
    }
  }

  let handlesaleprice = () => {
    const enteredPrice = prompt('Please Sale Price')
    this.setState({ enteredName: enteredPrice })
    setSalePrice(enteredPrice)
    approveListing()
  }
 
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (isLogging()) {
  return( 
    <div className='item section__padding'>
      <div className="item-image">
        <img src={tokenImage} alt="item" />
      </div>
      <div className="item-content">
        <div className="item-content-title">
          <h1>{tokenName.toUpperCase()}</h1>
          <p>{tokenId.toUpperCase()}</p>
          <p><span></span> Near</p>
        </div>
        <div className="item-content-detail">
          <p><span>Description</span></p>
          <p>{tokenDescription}</p>
          <p>{designdoc}</p>
        </div>
        <div className="item-content-buy">
          <button className="primary-btn" onClick={() => approveListing()}>{approving ? 'Listing ........' : 'Sell on Market'}</button>
          <button className="secondary-btn" onClick={() => openInNewTab(designdoc)}>View Archi Document</button>
        </div>
      </div>
    </div>
  )
}};

export default Nftitem;
