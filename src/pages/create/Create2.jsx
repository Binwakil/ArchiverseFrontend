import './create.css'
import Image from '../../assets/Image.png'
import * as React from 'react';
import { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = "2HJ8kWOjhRdzLZ4Q1CtUNmpZzri";
const projectSecret = "1626ddf14f36ec798751b74099a50391";
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);



const Create = () => {
  const [file, setFile] = useState(null);
  const [urlArr, setUrlArr] = useState([]);
  const [images, setImages] = useState([])

  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization
    }
  })
  

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);

    reader.onloadend = () => {
      setFile(Buffer(reader.result));
    };

    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const files = (form[0]).files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    try {
      const created = await ipfs.add(file);
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
    } catch (error) {
      console.log(error.message);
    }

     

    form.reset();
  };

  // const onSubmitHandler = async (event) => {
  //   console.log('clickedddddddddddddddd')
  //   event.preventDefault();
  //   const form = event.target;
  //   const files = (form[0]).files;

  //   if (!files || files.length === 0) {
  //     return alert("No files selected");
  //   }

  //   const file = files[0];
  //   // upload files
  //   //const result = await ipfs.add(file);
  //   try {
  //     const result = await client.add(file);
  //     const url = `https://ipfs.infura.io/ipfs/${result.path}`;
  //     setUrlArr((prev) => [...prev, url]);
  //     console.log('Yana zuwa nan ma')
  //   } catch (error) {
  //     console.log(error.message);
  //   }

  //   // setImages([
  //   //   ...images,
  //   //   {
  //   //     cid: result.cid,
  //   //     path: result.path,
  //   //   },
  //   // ]);

  //   form.reset();
  // };



  return (
    <div className='app'>
   

   <div className="main">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={retrieveFile} />
          <button type="submit" className="button">Submit</button>
        </form>
    </div>

      <div className="display">
        {urlArr.length !== 0
          ? urlArr.map((el) => <img src={el} alt="nfts" />)
          : <h3>Upload data</h3>}
      

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
};

export default Create;
