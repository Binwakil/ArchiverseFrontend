import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import { initContract } from "./near/initc";

const root = ReactDOM.createRoot(document.getElementById('root'));

window.nearInitPromise = initContract()
  .then(() => {
    
    root.render(
        <BrowserRouter>
        <App />
        </BrowserRouter>
    )
    
  })
  .catch(console.error)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
