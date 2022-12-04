import React, {useEffect, useState} from "react";
import './bids.css'
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";

import { Link } from 'react-router-dom';
import { Bid } from "../bid";
import { isLogging, approveAccount, loadCSaleItems } from "./../../near/utils";

const Bids = ({title}) => {
  let [userNFT, setUserNFT] = useState([]);

  let getusernft = async() => {
    let gettingNFT = await loadCSaleItems()
    setUserNFT(gettingNFT);
    console.log(gettingNFT)
}

let getbal = async() => {
  // let bals = await balances()
  // setBalance(bals);
}

useEffect(() => {
  getusernft();
  getbal();
},)

  return (
    <div className='bids section__padding'>
    <div className="bids-container">
    <div className="bids-container-text">
        <h1>Archi MarketPlace</h1>
      </div>    
    <div className="contract_asset_container">
            {
              userNFT.map((item) => {
              return(
               <Bid key={item.token_id} product={item}></Bid>
              ) }) 
            }
            </div>
            </div>
  
  </div>
)
}

export default Bids
