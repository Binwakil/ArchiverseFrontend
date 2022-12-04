import './create.css'
import Image from '../../assets/Image.png'
import * as React from 'react';
import { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { isLogging, mintNFT } from "./../../near/utils";


const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
const projectSecret = process.env.REACT_APP_INFURA_PROJECT_SECRET;
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
const CryptoJS = require('crypto-js');



const Create = () => {
  const [designfile, setDesignfile] = useState(null);
  const [designfilename, setDesignfilename] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [category, setCategory] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [design3dImage, setDesign3dImage] = useState(null);
  const [design3dImageName, setDesign3dImageName] = useState(null);
  const [designUrl, setdesignUrl] = useState(null)
  const [design3DUrl, setdesign3DUrl] = useState(null)

  const [urlArr, setUrlArr] = useState([]);
  const [images, setImages] = useState([])

  let [mint, setMint] = useState(false)

  let message = "café";
  let key = "something";

  let encrypted = CryptoJS.AES.encrypt(message, key);
  //equivalent to CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(message), key);
  let decrypted = CryptoJS.AES.decrypt(encrypted, key);


  const encryptDoc = (text) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
  };

  const decryptDoc = (data) => {
    return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
  };

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
    

    if (!nftName || !nftDescription) {

        alert('Kindly fill all the required  Information...');
        
    }
   if (!designUrl || designUrl.length === 0) {
      //if the User dont want Use IPFS to store the NFT image he can use an existing image URL
        if (!imgUrl || imgUrl.length === 0) {
            alert("tryagin or use Image URL")
        }
        else{
          nftfile = imgUrl;
        }
     
    }
    else{
        setMint(true);
        const d = new Date();
        let token_id = d.getTime().toString();
        let encryptedDoc = encryptDoc(nftdoc)
        console.log(encryptDoc)
        let mintingNFT = await mintNFT(token_id, nftName, nftDescription, nftfile, nftdoc, nftCategory);
        if (mintingNFT) {
            alert('NFT successfully minted');
        } else {
            alert('Error! Please try again');
        }
        setMint(false);
    }
}
let getExtension = async (filename) => {
  let ext = filename.split('.').pop()
  
  return ext

}

  const handleSubmit = async (e) => {
   let allowedExtensions =
   /(\.doc|\.docx|\.pdf|\.odt)$/i;
   let allowed3DExtensions =
   /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i;
   
    e.preventDefault();
    if (!designfile || designfile.length === 0 ) {
      return alert("the Architectural Documents are not Selected");
    }
  
    try {
      let flag = false
      if (design3dImage || design3dImage.length !== 0)
      {
        if (!allowed3DExtensions.exec(design3dImageName)) {
          alert('Invalid 3D file type: it should be pnd or jpg or gif');
          return false;
          }
          else
          {
            flag = true;
            const created3dfile = await ipfs.add(design3dImage);
            const created3Durl = `https://ipfs.io/ipfs/${created3dfile.path}`;
            console.log(created3Durl);
            setdesign3DUrl(created3Durl);
          }
      }
      if (designfile || designfile.length !== 0)
      {
        if (!allowedExtensions.exec(designfilename)) {
          alert('Invalid Archi Document file type: it should be pdf or Docx');
          return false;
          }
          else
          {
            const createdDesignfile = await ipfs.add(designfile);
            const createdDesignurl = `https://ipfs.io/ipfs/${createdDesignfile.path}`;
            console.log(createdDesignurl)
            setdesignUrl(createdDesignurl);
            setUrlArr((prev) => [...prev, createdDesignfile]);
            setImages([
              ...images,
              {
                cid: createdDesignfile.cid,
                path: createdDesignfile.path,
              },
      
            ]);
          }
     
      }
      if (flag === true)
      {
      if (!designUrl || designUrl.length !== 0 && !design3DUrl || design3DUrl.length !== 0 ){
      userMintNft();
      }
      }
      else
      {
      if (!designUrl || designUrl.length !== 0){
          userMintNft();
      }

      }
      console.log("URL:   https://ipfs.io/ipfs/" + images.path)
     
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLogging()) {

  return (
    <div className='register section__padding'>
      <div className="register-container">
        <h1>Create ArchiNFT Asset</h1>
        <form className='register-writeForm' autoComplete='off' onSubmit={handleSubmit}>
          <div className="register-formGroup">
            <label>3D Design</label>
            <input type="file" onChange={(e) => {setDesign3dImage(e.target.files[0]); setDesign3dImageName(e.target.files[0].name)} } className='custom-file-input'/>
            <p><span>or</span></p>
            <input type="text" placeholder='Paste the URl' value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} autoFocus={true} />
          </div>
          <div className="register-formGroup">
            <label>Title</label>
            <input type="text" placeholder='ArchiNFT Name' value={title} onChange={(e) => setTitle(e.target.value)} autoFocus={true} />
          </div>
          <div className="register-formGroup">
            <label>Description</label>
            <textarea type="text" rows={4} onChange={(e) => setDescription(e.target.value)} placeholder='Decription of your item' 
          ></textarea>
          </div>
          {/* <div className="register-formGroup">
            <label>Price</label>
            <div className="twoForm">
              <input type="text" placeholder='Price' onChange={(e) => setPrice(e.target.value)} />
              <select>
                <option value="LTC">yNEAR</option>
              </select>
            </div>
          </div> */}
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
            <label>Dcuments Upload</label>            
            <input type="file" name ='data'
              onChange={(e) =>{ setDesignfile(e.target.files[0]); setDesignfilename(e.target.files[0].name)} }className='custom-file-input'/>
          </div>
          <button type="submit" className="register-writeButton">Create</button>
        </form>
      </div>
    </div>   
  )
}
};

export default Create;
