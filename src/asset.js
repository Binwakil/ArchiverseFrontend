import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa"


import logo  from "./../image/logo.jpg";

export let Asset = ({product}) => {

    let {token_id, metadata} = product;

    let {title, description, media} = metadata;


    let [tokenName, setTokenName] = useState('');

    let [tokenId, setTokenId] = useState('');

    let [tokenDescription, setTokenDescription] = useState('');

    let [tokenImage, setTokenImage] = useState('');


    useEffect(() => {

        setTokenId(token_id);
        setTokenName(title);
        setTokenDescription(description);
        setTokenImage(media);
        
    })
   

    return(
        <div className="company_asset">

            <div className="asset_header">
                <p className="name">title: {tokenName}</p>
                <p className="pointer"><FaEllipsisV></FaEllipsisV></p>
            </div>

            <div className="image_contaniner">
                <img src={tokenImage} alt=""  />
            </div>

            <div className="company_asset_name">
                <h3>token ID: {tokenId}</h3>
                <p>description: {tokenDescription}</p>
            </div>

            <div className="market_btn">
                <Link className="market transfer" to={`transfer/${tokenId}`}>transfer</Link>
                <Link className="market aprove" to={`approve/${tokenId}`}>approve</Link>
            </div>

        </div>
    )
}