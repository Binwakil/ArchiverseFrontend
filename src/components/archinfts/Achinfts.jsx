import React, {useEffect, useState} from "react";
import './archinfts.css'
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';

import { Asset } from "../asset";

import { isLogging, yourToken } from "./../../near/utils";

const Archinfts = ({title}) => {
  let [userNFT, setUserNFT] = useState([]);
  
  // function for getting user nft 
  let getusernft = async() => {
      let gettingNFT = await yourToken()
      setUserNFT(gettingNFT);
  }

  useEffect(() => {
    getusernft();
  }, [isLogging])

  if (isLogging()) {
  return (
    <div className='bids section__padding'>
      <div className="bids-container">
      <div className="bids-container-text">
          <h1>{title}</h1>
        </div>    
      <div className="contract_asset_container">
              {
                userNFT.map((item) => {
                return(
                 <Asset key={item.token_id} product={item}></Asset>
                ) }) 
              }
              </div>
              </div>
    
    </div>
  )
}
}
export default Archinfts
