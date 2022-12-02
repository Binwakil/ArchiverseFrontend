import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa"

import { html2canvas } from "html2canvas"
import { jsPDF } from "jspdf"


export let Sale = ({product}) => {

    let {token_id, metadata} = product;
    let {title, description, media, extra} = metadata;

    let [tokenName, setTokenName] = useState('');
    let [tokenId, setTokenId] = useState('');
    let [tokenDescription, setTokenDescription] = useState('');
    let [tokenImage, setTokenImage] = useState('');
    let [designDoc, setdesignDoc] = useState('');
    let [nftCategory, setNftCategory] = useState('');
    let [tokenprice, setTokenprice] = useState('');


    useEffect(() => {
        setTokenId(token_id);
        setTokenName(title);
        setTokenDescription(description);
        setTokenImage(media);
        setdesignDoc(extra);
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
    return(
        <div className="bids-container-card">
        <div className="card-column1" >
          <div className="bids-card">
            <div className="bids-card-top">
            <Link to={`/Nftitem/${tokenId}`}>
            <p className="bids-title">{tokenName.toUpperCase}</p>
            <img className="imageclass" src={tokenImage} alt=""  />
            </Link>
            </div>
           
            <div className="nfttextdiv">
            <div className="bids-card-bottom">
              <p>: <span>{tokenId}</span></p>
              <p><span>{"tokenId"}</span> NEAR</p><break></break>
            </div>
          
            </div>
              
          <div className="register-button">
          <Link to={`transfer/${tokenId}`}>
            <button className='register-writeButton'>Update</button>
            </Link>
            <Link to={`approve/${tokenId}`}>
              <button className='reg-login-writeButton' >Delist</button>
            </Link>
          </div>
          <div className=" center">
            <button className='register-writeButton'  onClick={() => downloadPDF() }>View Document</button>
          </div>
          </div>
        </div>
        </div>
    )
}