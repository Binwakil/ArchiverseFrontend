import React, {useEffect, useState} from "react";

import  "./../../css/view.css";

import { Asset } from "./../asset";


import { Footer } from "./../footer";

import { isLogging, yourToken } from "./../../near/utils";



export let View = () => {

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
        return(<>

            <section id="asset">
    
                <section id="contract_asset">
    
                    <div id="contract_asset_header">
                        <h2> company product's asset</h2>
    
                    </div>
    
                    <div className="contract_asset_container">

                        {
                           userNFT.map((item) => {

                            return(
                                <Asset key={item.token_id} product={item}></Asset>
                            )

                           }) 
                        }
    
                    </div>
    
                    
    
                </section>
    
    
               
    
                
                
    
            </section>
            <Footer></Footer>
    
            </>
        )
    }


    
}