import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa"

import { html2canvas } from "html2canvas"
import { jsPDF } from "jspdf"


import { getAccount, isLogging, OfferPrice, RevokeSale, UpdatePrice} from"./../near/utils";
import { MARKET_CONTRACT_NAME} from"./../near/config";


export let Sale = ({product}) => {

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
   
    let downloadPDF = () => {
      // using Java Script method to get PDF file
      const input = document.getElementById('divToPrint');
       html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
  }

  let deListToken = async () => {
      let delisting = await RevokeSale(tokenId, MARKET_CONTRACT_NAME);
      if(delisting)
      {
      alert("the NFT is remove from the Marketplace")
      console.log("Delisting  " +delisting)
      }
  }

  let updateprice = async () => {
    let price = ""
      price = prompt('Please Enter your New Price')
      setOfferPrice(price)
      let sale_conditions = {
        sale_conditions: OfferPrice
      };
      //setmakingoffer(true);
      let oprice = JSON.stringify(sale_conditions)
    let updating = await UpdatePrice(tokenId, price);
    if(updating)
    {
    alert("the NFT is approve for listing")
    console.log("Updating " +updating)
    }
}

    return(
        <div className="bids-container-card">
        <div className="card-column1" >
          <div className="bids-card">
            <div className="bids-card-top">
            <p className="bids-title">{tokenName.toUpperCase}</p>
            <img className="imageclass" src={tokenImage} alt=""  />
            </div>
           
            <div className="nfttextdiv">
            <div className="bids-card-bottom">
            <p><span>{tokenId}</span></p>
            <p>Price : <span>{tokenprice + " "}</span> Near</p>
            </div>
          
            </div>
              
          <div className="register-button">
            <button className='register-writeButton' onClick={() => updateprice()}>Update</button>
            <button className='reg-login-writeButton' onClick={() => deListToken()} >Delist</button>
          </div>
          <div className=" center">
            <button className='register-writeButton'  onClick={() => downloadPDF() }>View Document</button>
          </div>
          </div>
        </div>
        </div>
    )
}