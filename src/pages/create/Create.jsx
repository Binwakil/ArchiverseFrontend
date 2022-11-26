import './create.css'
import Image from '../../assets/Image.png'
import * as React from 'react';
import { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { isLogging, mintNFT } from "./../../near/utils";


const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
const projectSecret = process.env.REACT_APP_INFURA_PROJECT_SECRET;
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

let autoImageArray = [
  'https://gateway.pinata.cloud/ipfs/QmV52E9U4LP7o4twPTAwtFeT1j64BRYEwAhXY7EZRvAP3e/1.jpg',
  'https://gateway.pinata.cloud/ipfs/QmV52E9U4LP7o4twPTAwtFeT1j64BRYEwAhXY7EZRvAP3e/2.jpg',
  'https://gateway.pinata.cloud/ipfs/QmV52E9U4LP7o4twPTAwtFeT1j64BRYEwAhXY7EZRvAP3e/3.jpg',
  'https://gateway.pinata.cloud/ipfs/QmV52E9U4LP7o4twPTAwtFeT1j64BRYEwAhXY7EZRvAP3e/4.jpg',
  'https://gateway.pinata.cloud/ipfs/QmV52E9U4LP7o4twPTAwtFeT1j64BRYEwAhXY7EZRvAP3e/5.jpg',
  'https://gateway.pinata.cloud/ipfs/QmV52E9U4LP7o4twPTAwtFeT1j64BRYEwAhXY7EZRvAP3e/6.jpg',
  'https://gateway.pinata.cloud/ipfs/QmV52E9U4LP7o4twPTAwtFeT1j64BRYEwAhXY7EZRvAP3e/7.jpg',
  'https://gateway.pinata.cloud/ipfs/QmV52E9U4LP7o4twPTAwtFeT1j64BRYEwAhXY7EZRvAP3e/8.jpg',
  'https://gateway.pinata.cloud/ipfs/QmV52E9U4LP7o4twPTAwtFeT1j64BRYEwAhXY7EZRvAP3e/9.png',
  'https://gateway.pinata.cloud/ipfs/QmV52E9U4LP7o4twPTAwtFeT1j64BRYEwAhXY7EZRvAP3e/10.png',
  'https://gateway.pinata.cloud/ipfs/QmV52E9U4LP7o4twPTAwtFeT1j64BRYEwAhXY7EZRvAP3e/11.jpg',
  'https://gateway.pinata.cloud/ipfs/QmV52E9U4LP7o4twPTAwtFeT1j64BRYEwAhXY7EZRvAP3e/12.jpg',
  'https://gateway.pinata.cloud/ipfs/QmV52E9U4LP7o4twPTAwtFeT1j64BRYEwAhXY7EZRvAP3e/13.jpg'
];


const Create = () => {
  const [designfile, setDesignfile] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [price, setPrice] = useState(null);
  const [design3dImage, setDesign3dImage] = useState(null);
  const [designUrl, setdesignUrl] = useState(null)
  const [design3DUrl, setdesign3DUrl] = useState(null)

  const [urlArr, setUrlArr] = useState([]);
  const [images, setImages] = useState([])

  let [mint, setMint] = useState(false)

  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization
    }
  })
  

  let userMintNft = async () => {
    let nftfile = design3DUrl;
    let nftdoc = designUrl;
    let nftName = title;
    let nftDescription = description;
    let nftCategory = category;
    let nftQuantity = quantity;
    let nftPrice = price;
    console.log(nftName+nftDescription+nftQuantity+nftPrice)

    if (!nftName || !nftDescription  || !nftQuantity || !nftPrice) {

        alert('Kindly fill all the required  Information...');
        
    }
    else if (!nftfile || nftfile.length === 0) {
      let randomImg = Math.floor(Math.random()*autoImageArray.length);
      nftfile = autoImageArray[randomImg];
    }
    else{
        setMint(true);
        const d = new Date();
        let token_id = d.getTime().toString();
        let mintingNFT = await mintNFT(token_id, nftName, nftDescription, nftfile, nftdoc);
        if (mintingNFT == '') {
            alert('NFT successfully minted');
        } else {
            alert('error please!');
        }
        setMint(false);
    }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!designfile || designfile.length === 0 ) {
      return alert("the Architectural Documents are not Selected");
    }
    else if (!design3dImage || design3dImage.length === 0)
    {
      return alert("Kindly Select the NFT Design Document");
    }
    try {
      const created3dfile = await ipfs.add(design3dImage);
      const createdDesignfile = await ipfs.add(designfile);
      const created3Durl = `https://ipfs.io/ipfs/${created3dfile.path}`;
      const createdDesignurl = `https://ipfs.io/ipfs/${createdDesignfile.path}`;
      console.log(created3Durl);
      console.log(createdDesignurl)
      setdesign3DUrl(created3Durl);
      setdesignUrl(createdDesignurl);
      setUrlArr((prev) => [...prev, createdDesignfile]);
      setImages([
        ...images,
        {
          cid: createdDesignfile.cid,
          path: createdDesignfile.path,
        },

      ]);
      console.log("URL:   https://ipfs.io/ipfs/" + images.path)
      if (!design3dImage || design3dImage.length === 0)
      {
        return alert("Kindly Select the NFT Design Document");
      }
      else
      {
        userMintNft();
      }
    } catch (error) {
      console.log(error.message);
    }

    // form.reset();
  };

  if (isLogging()) {

  return (
    <div className='register section__padding'>
      <div className="register-container">
        <h1>Create ArchiNFT</h1>
        <form className='register-writeForm' autoComplete='off' onSubmit={handleSubmit}>
          <div className="register-formGroup">
            <label>3D Design</label>
            <input type="file" onChange={(e) => setDesign3dImage(e.target.files[0])} className='custom-file-input'/>
          </div>
          <div className="register-formGroup">
            <label>Name</label>
            <input type="text" placeholder='ArchiNFT Name' value={title} onChange={(e) => setTitle(e.target.value)} autoFocus={true} />
          </div>
          <div className="register-formGroup">
            <label>Description</label>
            <textarea type="text" rows={4} onChange={(e) => setDescription(e.target.value)} placeholder='Decription of your item' 
          ></textarea>
          </div>
          <div className="register-formGroup">
            <label>Price</label>
            <div className="twoForm">
              <input type="text" placeholder='Price' onChange={(e) => setPrice(e.target.value)} />
              <select>
                <option value="ETH">ETH</option>
                <option value="BTC">BTC</option>
                <option value="LTC">Near</option>
              </select>
            </div>
          </div>
          <div className="register-formGroup">
            <label>Category</label>
            <select onChange={(e) => setCategory(e.target.value)} >
               <option>Residential Buildings.</option>
               <option>Educational Buildings</option>
               <option>Institutional Buildings</option>
               <option>Assembly Buildings</option>
               <option>Business Buildings</option>
               <option>Mercantile Buildings</option>
            </select>
          </div>
          <div className="register-formGroup">
            <label>Available ArchiNFT</label>
            <input type="text" placeholder='No of Items' onChange={(e) => setQuantity(e.target.value)}/>
          </div>
          <div className="register-formGroup">
            <label>Dcuments Upload</label>            
            <input type="file" name ='data'  onChange={(e) => setDesignfile(e.target.files[0])}className='custom-file-input'/>
          </div>
          <button type="submit" className="register-writeButton">Create</button>
        </form>
      </div>

      {/* <div className="display">
        <h3>Uploaded data</h3>
         {images.map((image, index) => (
          <img
            alt={`Uploaded #${index + 1}`}
            src={"https://ipfs.io/ipfs/" + image.path}
            style={{ maxWidth: "400px", margin: "15px" }}
            key={image.cid.toString() + index}
          />
        ))}
      </div> */}
    </div>   
  )
}
};

export default Create;
