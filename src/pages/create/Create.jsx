import './create.css'
import Image from '../../assets/Image.png'
import * as React from 'react';
import { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { isLogging, mintNFT } from "./../../near/utils";


const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
const projectSecret = process.env.REACT_APP_INFURA_PROJECT_SECRET;
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);


const Create = () => {
  console.log(" Project ID here " + process.env.REACT_APP_INFURA_PROJECT_ID)
  console.log("Hereeee this    " + process.env.REACT_APP_INFURA_PROJECT_SECRET)
  console.log("Nan this    " + projectId)
  console.log("Chan this    " + projectSecret)
  const [designfile, setDesignfile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(null);
  const [design3dImage, setDesign3dImage] = useState(null);

  const [urlArr, setUrlArr] = useState([]);
  const [images, setImages] = useState([])

  let [mint, setMint] = useState(false)

  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization
    }
  })
  

  // const retrieveFile = (e) => {
  //   const data = e.target.files[0];
  //   const reader = new window.FileReader();
  //   reader.readAsArrayBuffer(data);

  //   reader.onloadend = () => {
  //     setFile(Buffer(reader.result));
  //   };

  //   e.preventDefault();
  // };

  let userMintNft = async () => {

    let nftfile = design3dImage;
    let nftName = title;
    let nftDescription = description;
    let nftCategory = category;
    let nftQuantity = quantity;
    let nftPrice = price;

    if (!nftName || !nftDescription  || !nftCategory || !nftQuantity || !nftPrice) {

        alert('Kindly fill all the required  Information...');
        
    }else if (!nftfile || nftfile.length === 0) {
      return alert("the 3D File is not selected");
    }
    else{
        setMint(true);
        if (!nftfile) {
          alert('Kindly Select the 3D Design File');
        }
        const d = new Date();
        let token_id = d.getTime().toString();
        let mintingNFT = await mintNFT(token_id, nftName, nftDescription, nftfile);
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
    const form = e.target;
    const files = (form[0]).files;

    if (!designfile || designfile.length === 0) {
      return alert("No file selected");
    }
    
   
    try {
      const created = await ipfs.add(designfile);
      const url = `https://ipfs.io/ipfs/${created.path}`;
      console.log(url)
      setUrlArr((prev) => [...prev, url]);
      setImages([
        ...images,
        {
          cid: created.cid,
          path: created.path,
        },

      ]);
      console.log("URL:   https://ipfs.io/ipfs/" + images.path)
      userMintNft();
    } catch (error) {
      console.log(error.message);
    }

     

    form.reset();
  };

  if (isLogging()) {

  return (
    <div className='register section__padding'>
      <div className="create-container">
        <h1>Create new ArchiNFT</h1>
        <p className='upload-file'>Upload File</p>
        <div className="upload-img-show">
            <h3>JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.</h3>
            <img src={Image} alt="banner" />
            <p>Drag and Drop File</p>
        </div>
        <form className='writeForm' autoComplete='off' onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>3D Design</label>
            <input type="file" onChange={(e) => setDesign3dImage(e.target.files[0])} className='custom-file-input'/>
          </div>
          <div className="formGroup">
            <label>Name</label>
            <input type="text" placeholder='ArchiNFT Name' onChange={(e) => setTitle(e.target.files[0])} autoFocus={true} />
          </div>
          <div className="formGroup">
            <label>Description</label>
            <textarea type="text" rows={4} onChange={(e) => setDescription(e.target.files[0])} placeholder='Decription of your item' 
          ></textarea>
          </div>
          <div className="formGroup">
            <label>Price</label>
            <div className="twoForm">
              <input type="text" placeholder='Price' onChange={(e) => setPrice(e.target.files[0])} />
              <select>
                <option value="ETH">ETH</option>
                <option value="BTC">BTC</option>
                <option value="LTC">Near</option>
              </select>
            </div>
          </div>
          <div className="formGroup">
            <label>Category</label>
            <select onChange={(e) => setCategory(e.target.files[0])} >
               <option>Residential Buildings.</option>
               <option>Educational Buildings</option>
               <option>Institutional Buildings</option>
               <option>Assembly Buildings</option>
               <option>Business Buildings</option>
               <option>Mercantile Buildings</option>
            </select>
          </div>
          <div className="formGroup">
            <label>Available ArchiNFT</label>
            <input type="text" placeholder='No of Items' onChange={(e) => setQuantity(e.target.files[0])}/>
          </div>
          <div className="formGroup">
            <label>Dcuments Upload</label>            
            <input type="file" name ='data'  onChange={(e) => setDesignfile(e.target.files[0])}className='custom-file-input'/>
          </div>
          <button type="submit" className="writeButton">Create</button>
        </form>
      </div>

      <div className="display">
        <h3>Uploaded data</h3>
         {images.map((image, index) => (
          <img
            alt={`Uploaded #${index + 1}`}
            src={"https://ipfs.io/ipfs/" + image.path}
            style={{ maxWidth: "400px", margin: "15px" }}
            key={image.cid.toString() + index}
          />
         
        ))}
      </div>

    </div>
   
  )
}
};

export default Create;
