import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa"



export let Asset = ({product}) => {

    let {token_id, metadata} = product;
    let {title, description, media, extra} = metadata;

    let [tokenName, setTokenName] = useState('');
    let [tokenId, setTokenId] = useState('');
    let [tokenDescription, setTokenDescription] = useState('');
    let [tokenImage, setTokenImage] = useState('');
    let [designDoc, setdesignDoc] = useState('');


    useEffect(() => {
        setTokenId(token_id);
        setTokenName(title);
        setTokenDescription(description);
        setTokenImage(media);
        setdesignDoc(extra);
    })
   
    console.log(designDoc)
    console.log(tokenImage)

    return(
        <div className="bids-container-card">
        <div className="card-column1" >
          <div className="bids-card">
            <div className="bids-card-top">
            <Link to={`/Nftitem/${tokenId}`}>
            <img className="imageclass" src={tokenImage} alt=""  />
            <p className="bids-title">{tokenName}</p>
            </Link>
            </div>
            <div className="bids-card-bottom">
              <p>Token ID: <span>{tokenId}</span></p><break></break>
            </div>
            <div className="nfttextdiv">
              <p className="nftdetail">Description: <span>{tokenDescription}</span></p><break></break>
              
            </div>
              
          <div className="register-button">
          <Link to={`transfer/${tokenId}`}>
            <button className='register-writeButton'>Transfer</button>
            </Link>
            <Link to={`approve/${tokenId}`}>
              <button className='reg-login-writeButton' >Approve</button>
            </Link>
          </div>
          </div>
        </div>
        </div>
    )
}