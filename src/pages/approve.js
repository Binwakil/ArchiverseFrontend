import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";

import  "./../../css/approve.css";
import { Footer } from "./../footer";

import logo from "./../../image/logo.jpg";

import { isLogging, approveAccount, yourToken } from "./../../near/utils";



export let Approve = () => {
  

    let [name, setName] = useState('');
    let [image, setImage] = useState('');
    let [description, setDescription] = useState('');

    

    let [account, setAccount] = useState('')

    let [approve, setapproving] = useState(false);


    let {token_id} = useParams();



    // function to get approved token metadata
    
    let tokemmetadata = async () => {

        let  tokens_metadata = await yourToken();

       let approve_token = tokens_metadata.filter((token) => {

        return (token.token_id == token_id);
       })

       //console.log(approve_token);

       
       setName(approve_token[0].metadata.title);
       setDescription(approve_token[0].metadata.description);
       setImage(approve_token[0].metadata.media);
    }


    // function for approving accont 

    let approveAcc = async () => {

        let account_id = account;

        if (account_id == '') {

            alert('enter account please');
            
        } else {

            setapproving(true);

            let approving_account = await approveAccount(token_id, account_id);

            //console.log(approving_account)

            setapproving(false);
            
        }

        
    }
 


    useEffect(() => {

        tokemmetadata();
    })
  


  
    if (isLogging()) {

        return(
            <>
            <section id="market">
                <div id="container">
    
                    <div id="nft_container">
    
                        <div id="market_image_container">
    
                            <img src={image} alt=""  />
                            
                        </div>
    
                        <div className="name">
    
                            <h3>({name}) token_id: {token_id}</h3>
                            <p>{description}</p>
    
                        </div>
    
                    </div>
    
                    <div id="market_form_container">
    
                        <div id="price_container">
                            <label htmlFor="price">account</label>
                            <input type="text" id="price" value={account}  onChange={(e) => setAccount(e.target.value)}/>
                        </div>
    
                        <div id="time_container">
    
                            {/*<div className="time">
                                <label htmlFor="hour">hours</label>
                                <input type="number" id="hour"  value={hour} onChange={(e) => setHour(e.target.value)}/>
                            </div>
    
    
                            <div className="time">
                                <label htmlFor="day">days</label>
                                <input type="number" id="day" value={day} onChange={(e) => setDay(e.target.value)}/>
                            </div>
    
                            <div className="time">
                                <label htmlFor="week">weeks</label>
                                <input type="number" id="week" value={week} onChange={(e) => setWeek(e.target.value)}/>
                            </div>
    
                            <div className="time">
                                <label htmlFor="month">months</label>
                                <input type="number" id="month" value={month} onChange={(e) => setMonth(e.target.value)}/>
                            </div>*/}
    
    
                        </div>
    
                        <div id="market_btn">
                            <button type="button" onClick={() => approveAcc()}>{approve ? 'approving....' : 'approve'}</button>
                        </div>
    
    
                    </div>
                </div>
                
    
            </section>
            <Footer></Footer>
    
            </>
        )
    
        
    }


   
}