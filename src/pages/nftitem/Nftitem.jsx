import React, {useEffect, useState} from "react";
import './nftitem.css'
import creator from '../../assets/seller2.png'
import item from '../../assets/item1.png'
import { Link, useParams } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa"
import { isLogging, transferToken, yourToken } from "./../../near/utils";


const Nftitem = ({product}) => {
  let {token_id} = useParams();

  console.log("MY ID "+token_id)

    let [tokenName, setTokenName] = useState('');
    let [tokenId, setTokenId] = useState('');
    let [tokenDescription, setTokenDescription] = useState('');
    let [tokenImage, setTokenImage] = useState('');

   // function to get approved token metadata
   let tokemmetadata = async () => {
    let  tokens_metadata = await yourToken();
   let approve_token = tokens_metadata.filter((token) => {
    return (token.token_id == token_id);
   })
  

   setTokenName(approve_token[0].metadata.title);
   setTokenDescription(approve_token[0].metadata.description);
   setTokenImage(approve_token[0].metadata.media);
   setTokenId(token_id)

  }

  useEffect(() => {
    tokemmetadata();
  })
 

  return( 
      <div className='item section__padding'>
        <div className="item-image">
          <img src={tokenImage} alt="item" />
        </div>
          <div className="item-content">
            <div className="item-content-title">
              <h1>{tokenName}</h1>
              <p><span>{tokenId}</span></p>
            </div>
            <div className="item-content-creator">
              <div><p>Creater Me</p></div>
              <div>
                <img src={creator} alt="creator" />
                <p>Rian Leon </p>
              </div>
            </div>
            <div className="item-content-detail">
              <p>{tokenDescription}</p>
            </div>
            <div className="item-content-buy">
              <button className="primary-btn">Buy For 4.5 ETH</button>
              <button className="secondary-btn">List on Marketplace</button>
            </div>
          </div>
      </div>
  )
};

export default Nftitem;
