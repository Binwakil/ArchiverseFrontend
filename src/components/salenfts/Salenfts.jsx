import React, {useEffect, useState} from "react";
import './salenfts.css'
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';

import { Sale } from "../sale";

// import { isLogging, yourSales, myToken } from "./../../near/market_utils";

import { isLogging, approveAccount, loadSaleItemsforowner, getsalescount } from "../../near/utils";

const Salenfts = ({title}) => {
  let [userNFT, setUserNFT] = useState([]);
  let [balance, setBalance] = useState();
  // let acc = getAccount()
  // let bal = balances()


  // console.log("Account = " +acc)
  // console.log("Bal = " +bal +"hh " +balance)
  
  // function for getting user nft 
  let getusernft = async() => {
      let gettingNFT = await loadSaleItemsforowner()
      setUserNFT(gettingNFT);

      console.log(gettingNFT)
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
                 <Sale key={item.token_id} product={item}></Sale>
                ) }) 
              }
              </div>
              </div>
    
    </div>
  )
}
}
export default Salenfts
