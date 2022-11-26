import React, {useState} from "react";
import { Footer } from "./../footer";


import  "./../../css/mint.css";

import { isLogging, mintNFT } from "./../../near/utils";


// array for auto img url

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

export let Mint = () => {

    let [imgurl, setImgurl] = useState('');
    let [name, setName] = useState('');
    let [description, setDescription] = useState('')

    let [mint, setMint] = useState(false)

    




    // function to mint nft :::::::::::::

    let userMintNft = async () => {
        let file = imgurl;
        let nftName = name;
        let nftDescription = description;

        if (!nftName || !nftDescription) {

            alert('please fill all the required  inputs...');
            
        }else{

            setMint(true);

            if (!file) {

                let randomImg = Math.floor(Math.random()*autoImageArray.length);

                file = autoImageArray[randomImg];
                
            } else {
                
                file = imgurl;
            }

            const d = new Date();

            let token_id = d.getTime().toString();

            let mintingNFT = await mintNFT(token_id, nftName, nftDescription, file);

            
            if (mintingNFT == '') {

                alert('NFT successfully minted');
                
            } else {
                
                alert('error please!');
            }

           
            
            
      

            setMint(false);

            

           
       
        }
    }



    if (isLogging()) {

        return(
            <>
            <section id="mint">
                
                <div>
    
                    <div className="mint_header">
                        <h2>get your own NFT today</h2>
                    </div>
    
                    <div className="input">
                        <input type="text" placeholder="name" className="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
    
                    <div className="input">
                        <input type="text"placeholder="description" className="name" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
    
                    <div className="input">
                        <input type="text"placeholder="image url or leave  for auto" className="name" value={imgurl} onChange={(e) => setImgurl(e.target.value)}/>
                    </div>
    
                    {/*<div className="input_file">
                        <input type="file" className="file" onChange={(e) => setImage(e.target.files[0])}/>
                        <button type="button">{!image ? 'choose image' : image.name}</button>
                    </div>*/}
    
                    <div className="mint_btn">
                    <button type="button" onClick={() => userMintNft() }>{mint ? 'minting...' : 'mint'}</button>
                    </div>
    
    
    
                </div>
    
            </section>
            <Footer></Footer>  
    
            </>
        )
        
    }

    
}