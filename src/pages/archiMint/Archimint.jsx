import React from 'react';
import './Archimint.css'
import {Link} from 'react-router-dom'
import Image from '../../assets/Image.png'

let Archimint = () => {

  return (
    <div className='register section__padding'>
      <div className="register-container">
        <h1>Mint ArchiNFT</h1>
        <p className='upload-file'>Upload 3D Design</p>
        <div className="upload-img-show">
          <img src={Image} alt="banner" />
          <p>browse media on your device</p>
        </div>
        <form className='register-writeForm' autoComplete='off' >
          <div className="register-formGroup">
            <label>Upload</label>
            <input type="file" className='custom-file-input'/>
          </div>
          <div className="register-formGroup">
            <label>Design Title</label>
            <input type="text" placeholder='Title' />
          </div>
          <div className="register-formGroup">
            <label>Category</label>
            <input type="text" placeholder='Category'  />
          </div>
          <div className="register-formGroup">
            <label>Price</label>
            <input type="number" placeholder='0.00 Near' />
          </div>
          <div className="register-formGroup">
            <label>Description</label>
            <input type="text" placeholder='Description'   />
          </div>
          <div className="register-formGroup">
            <label>Design File</label>
            <input type="file" className='custom-file-input' name="data" onChange={retrieveFile} />
          </div>
         <div className="register-button">
          <button className='register-writeButton'>register</button>
          <Link to="/login">
            <button className='reg-login-writeButton' >Login</button>
          </Link>
         </div>
        </form>
      </div>
    </div>
   )
};

export default Archimint;
